import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartService {
    private prisma;
    private config;
    private readonly logger;
    private redis;
    private readonly CACHE_TTL;
    constructor(prisma: PrismaService, config: ConfigService);
    private cacheKey;
    getCart(userId: string): Promise<{}>;
    addToCart(userId: string, dto: AddToCartDto): Promise<{}>;
    updateItem(userId: string, itemId: string, dto: UpdateCartDto): Promise<{}>;
    removeItem(userId: string, itemId: string): Promise<{}>;
    clearCart(userId: string): Promise<{
        message: string;
    }>;
    totalOrders(): Promise<number>;
    totalRevenue(): Promise<number>;
}
