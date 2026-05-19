import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtRefreshPayload } from './strategies/jwt-refresh.strategy';
interface RequestWithUser extends Request {
    user: JwtRefreshPayload & {
        refreshToken: string;
    };
    cookies: Record<string, string>;
}
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    register(dto: RegisterDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
        user: object;
    }>;
    refresh(req: RequestWithUser, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(req: Request & {
        cookies: Record<string, string>;
    }, res: Response): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
export {};
