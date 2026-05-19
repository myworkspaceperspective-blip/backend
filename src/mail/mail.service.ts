import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.getOrThrow<string>('SMTP_HOST'),
      port: this.config.get<number>('SMTP_PORT', 587),
      secure: this.config.get<boolean>('SMTP_SECURE', false),
      auth: {
        user: this.config.getOrThrow<string>('SMTP_USER'),
        pass: this.config.getOrThrow<string>('SMTP_PASS'),
      },
    });
  }

  async sendVerificationEmail(
    to: string,
    name: string,
    token: string,
  ): Promise<void> {
    const url = `${this.config.getOrThrow<string>('FRONTEND_URL')}/verify-email/${token}`;
    try {
      await this.transporter.sendMail({
        from: `"${this.config.get('MAIL_FROM_NAME', 'App')} " <${this.config.getOrThrow<string>('SMTP_USER')}>`,
        to,
        subject: 'Verify your email address',
        html: `
          <h2>Hello ${name},</h2>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${url}" style="background:#7c3aed;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">Verify Email</a>
          <p>This link expires in 24 hours.</p>
        `,
      });
    } catch (error) {
      this.logger.error(`Failed to send verification email to ${to}`, error);
    }
  }

  async sendPasswordResetEmail(
    to: string,
    name: string,
    token: string,
  ): Promise<void> {
    const url = `${this.config.getOrThrow<string>('FRONTEND_URL')}/reset-password/${token}`;
    try {
      await this.transporter.sendMail({
        from: `"${this.config.get('MAIL_FROM_NAME', 'App')} " <${this.config.getOrThrow<string>('SMTP_USER')}>`,
        to,
        subject: 'Reset your password',
        html: `
          <h2>Hello ${name},</h2>
          <p>Click the link below to reset your password. This link expires in 1 hour.</p>
          <a href="${url}" style="background:#7c3aed;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
        `,
      });
    } catch (error) {
      this.logger.error(`Failed to send reset email to ${to}`, error);
    }
  }
}
