import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { type AppEnv } from '../../core/config/app.config';

@Injectable()
export class SmtpService {
  constructor(private readonly config: ConfigService<AppEnv, true>) {}

  async sendMail(to: string, subject: string, text: string) {
    const transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: this.config.get('SMTP_PORT'),
      secure: this.config.get('SMTP_SECURE'),
      auth: {
        user: this.config.get('SMTP_USER'),
        pass: this.config.get('SMTP_PASS'),
      },
    });

    await transporter.sendMail({
      from: this.config.get('SMTP_FROM'),
      to,
      subject,
      text,
    });
  }
}
