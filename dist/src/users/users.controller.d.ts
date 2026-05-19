import { UsersService } from './users.service';
import { JwtPayload } from '../auth/strategies/jwt.strategy';
interface RequestWithUser extends Request {
    user: JwtPayload;
}
export declare class UsersController {
    private users;
    constructor(users: UsersService);
    getMe(req: RequestWithUser): Promise<{
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client/client", { with: { "resolution-mode": "import" } }).$Enums.Role;
        isVerified: boolean;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client/client", { with: { "resolution-mode": "import" } }).$Enums.Role;
        isVerified: boolean;
        createdAt: Date;
    }[]>;
    getStats(): Promise<{
        total: number;
        admins: number;
    }>;
}
export {};
