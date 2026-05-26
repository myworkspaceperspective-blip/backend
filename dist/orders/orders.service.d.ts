import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    placeOrder(userId: string, dto: CreateOrderDto): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
        };
        items: ({
            product: {
                category: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    image: string | null;
                } | null;
            } & {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                price: number;
                image: string;
                categoryId: string | null;
                stock: number;
                isAvailable: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: number;
        address: string | null;
        phone: string | null;
        note: string | null;
        paymentMethod: string;
        status: import("@prisma/client").$Enums.OrderStatus;
    }>;
    getUserOrders(userId: string): Promise<({
        user: {
            name: string;
            email: string;
            id: string;
        };
        items: ({
            product: {
                category: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    image: string | null;
                } | null;
            } & {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                price: number;
                image: string;
                categoryId: string | null;
                stock: number;
                isAvailable: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: number;
        address: string | null;
        phone: string | null;
        note: string | null;
        paymentMethod: string;
        status: import("@prisma/client").$Enums.OrderStatus;
    })[]>;
    getOrderById(id: string, userId?: string): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
        };
        items: ({
            product: {
                category: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    image: string | null;
                } | null;
            } & {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                price: number;
                image: string;
                categoryId: string | null;
                stock: number;
                isAvailable: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: number;
        address: string | null;
        phone: string | null;
        note: string | null;
        paymentMethod: string;
        status: import("@prisma/client").$Enums.OrderStatus;
    }>;
    getAllOrders(): Promise<({
        user: {
            name: string;
            email: string;
            id: string;
        };
        items: ({
            product: {
                category: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    image: string | null;
                } | null;
            } & {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                price: number;
                image: string;
                categoryId: string | null;
                stock: number;
                isAvailable: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: number;
        address: string | null;
        phone: string | null;
        note: string | null;
        paymentMethod: string;
        status: import("@prisma/client").$Enums.OrderStatus;
    })[]>;
    updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
        };
        items: ({
            product: {
                category: {
                    name: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    image: string | null;
                } | null;
            } & {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                price: number;
                image: string;
                categoryId: string | null;
                stock: number;
                isAvailable: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            price: number;
            productId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        total: number;
        address: string | null;
        phone: string | null;
        note: string | null;
        paymentMethod: string;
        status: import("@prisma/client").$Enums.OrderStatus;
    }>;
    getAdminStats(): Promise<{
        totalOrders: number;
        revenue: number;
        pendingOrders: number;
    }>;
}
