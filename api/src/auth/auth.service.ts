import { HttpStatus, Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';

import { QueueService } from '../queue/queue.service';

import { AppError } from '../utils/appError.util';

import { User } from '../user/user.entity';

import { CreateUserDTO } from './dto/create-user.dto';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UserDto } from '../dto/user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JWTPayload } from './jwt-payload.type';

import { ErrorMessage } from '../enums/error-messages.enum';
import { SuccessMessages } from '../enums/success-messages.enum';
import { PassWordChangeDTO } from './dto/password-change.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cacheManger: Cache,
    private readonly jwtService: JwtService,
    private readonly emailQueue: QueueService,
    private readonly configService: ConfigService,
  ) {}

  private async generateTokens(auth: JWTPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(auth, {
        expiresIn: 60 * 60 * 24,
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      }),
      this.jwtService.signAsync(auth, {
        // Access token will expire in 1week
        expiresIn: 60 * 60 * 24 * 7,
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signUp(createUserDto: CreateUserDTO) {
    // check if the user exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser)
      throw new AppError(ErrorMessage.USER_ALREADY_EXISTS, HttpStatus.CONFLICT);

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    return SuccessMessages.USER_CREATED_SUCCESSFULLY;
  }

  async login(authCredentialsDto: AuthCredentialsDTO) {
    const { email, password } = authCredentialsDto;

    const query = this.userRepository.createQueryBuilder(User.name);
    const user = await query.where({ email }).getOne();

    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      // 2) RETURN THE USER IF FOUND AND ADD THE TOKEN TO THE REQUEST BODY
      const tokens = await this.generateTokens({
        sub: user.id,
        role: user.role,
      });

      return {
        user: user as UserDto,
        tokens,
      };
    }

    throw new AppError(ErrorMessage.INVALID_LOGIN_CREDENTIALS, 400);
  }

  async refreshToken(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    const tokens = await this.generateTokens({
      sub: user.id,
      role: user.role,
    });
    return { tokens };
  }

  private createResetToken(length: number) {
    let resetToken = '';
    const regex = /0\d{3}0/;
    while (resetToken.length < length) {
      const digit = Math.floor(Math.random() * 10).toString();
      if (!regex.test(`${resetToken}${digit}`) || resetToken.length > 0) {
        resetToken += digit;
      }
    }

    return resetToken;
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const token = this.createResetToken(4);

    // find the user based on teh given email
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    // If no user is found, YELL!!!
    if (!user)
      throw new AppError(ErrorMessage.NO_USER_FOUND, HttpStatus.BAD_REQUEST);

    await this.cacheManger.set<string>(user.email, token, {
      ttl: 10 * 60,
    });

    // 2) Save OTP alongside expiry date to DB
    await this.emailQueue.addJob({
      templateKey: 'RESET_PASSWORD',
      to: data.email,
      subject: 'Password Reset Request',
      data: JSON.stringify({ token }),
    });

    return SuccessMessages.EMAIL_SENT;
  }

  async resetPassword(data: ResetPasswordDto) {
    const token = await this.cacheManger.get<string>(data.email);

    /**
      if token is not found, 
      it means the token has been deleted so, 
      YELL AT THE USER!!!
    */
    if (!token)
      throw new AppError(ErrorMessage.TOKEN_EXPIRED, HttpStatus.BAD_REQUEST);

    if (token !== data.token) throw new AppError('invalid token', 400);

    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user)
      throw new AppError(ErrorMessage.NO_USER_FOUND, HttpStatus.BAD_REQUEST);

    if (data.password !== data.confirmPassword)
      throw new AppError(
        ErrorMessage.PASSWORD_MISMATCH,
        HttpStatus.BAD_REQUEST,
      );

    const salt = await bcrypt.genSalt();

    user.password = await bcrypt.hash(data.password, salt);

    await this.userRepository.save(user);

    await this.emailQueue.addJob({
      templateKey: 'RESET_SUCCESSFUL',
      to: data.email,
      subject: 'Password Reset Successful',
    });

    // delete token
    await this.cacheManger.del(data.email);

    return SuccessMessages.PASSWORD_RESET_SUCCESSFUL;
  }

  async changePassword(passWordChangeDTO: PassWordChangeDTO, userId: string) {
    const { oldPassword, confirmPassword, newPassword } = passWordChangeDTO;

    if (confirmPassword !== newPassword)
      throw new AppError(
        ErrorMessage.PASSWORD_MISMATCH,
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.userRepository
      .createQueryBuilder(User.name)
      .select()
      .where({ id: userId })
      .getOne();

    if (!user && !(await bcrypt.compare(oldPassword, user.password))) {
      throw new AppError(ErrorMessage.INVALID_LOGIN_CREDENTIALS, 400);
    }

    const salt = await bcrypt.genSalt();

    user.password = await bcrypt.hash(newPassword, salt);

    return SuccessMessages.PASSWORD_CHANGE_SUCCESSFUL;
  }
}
