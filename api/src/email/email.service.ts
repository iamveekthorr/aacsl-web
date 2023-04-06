import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';
import * as pug from 'pug';
import * as path from 'path';
import { htmlToText } from 'html-to-text';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  private from = `AACSL <${this.configService.get<string>('MAIL_FROM')}>`;
  private replyTo = this.configService.get<string>('SUPPORT_EMAIL');

  private createTransport() {
    return nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST_NAME'),
      port: this.configService.get<number>('SMTP_HOST_PORT'),
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async send(
    file: string,
    subject: string,
    data: { to: string; [key: string]: any },
  ) {
    //Render the html for the email based on a pug template

    const html = pug.renderFile(file, {
      subject,
      data,
      basedir: path.join(__dirname, '/templates'),
      context: { data },
    });

    //Define the email options
    const mailOptions = {
      from: data.from || this.from,
      replyTo: data.replyTo || this.replyTo,
      to: data.to,
      subject,
      html,
      text: htmlToText(html),
    };

    return await this.createTransport().sendMail(mailOptions);
  }
}
