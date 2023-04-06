import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { JwtRefreshGuard } from './jwt-refresh.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JWTPayload } from './jwt-payload.type';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UserDto } from '../dto/user.dto';
import { PassWordChangeDTO } from './dto/password-change.dto';
import { JwtGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signup(@Body() data: CreateUserDTO) {
    return await this.authService.signUp(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() data: AuthCredentialsDTO) {
    return await this.authService.login(data);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refreshToken(@CurrentUser() user: JWTPayload) {
    return await this.authService.refreshToken(user.sub);
  }

  @Patch('reset-password')
  async passwordReset(@Body() data: ResetPasswordDto) {
    return await this.authService.resetPassword(data);
  }

  @Patch('forgot-password')
  async forgotPassword(@Body() email: ForgotPasswordDto) {
    return await this.authService.forgotPassword(email);
  }

  @UseGuards(JwtGuard)
  @Patch('change-password')
  async changePassword(
    @CurrentUser() user: UserDto,
    @Body() passwordChangeDto: PassWordChangeDTO,
  ) {
    return await this.authService.changePassword(passwordChangeDto, user.id);
  }
}
