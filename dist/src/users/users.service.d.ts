import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../../node_modules/.prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
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
    countByRole(role: Role): Promise<number>;
    totalCount(): Promise<number>;
    verifiedCount(): Promise<number>;
}
