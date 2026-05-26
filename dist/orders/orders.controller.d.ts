import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtPayload } from '../auth/strategies/jwt.strategy';
interface RequestWithUser extends Request {
    user: JwtPayload;
}
export declare class OrdersController {
    private orders;
    constructor(orders: OrdersService);
    placeOrder(req: RequestWithUser, dto: CreateOrderDto): Promise<{
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
    getMyOrders(req: RequestWithUser): Promise<({
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
    getMyOrder(req: RequestWithUser, id: string): Promise<{
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
    getAdminStats(): Promise<{
        totalOrders: number;
        revenue: number;
        pendingOrders: number;
    }>;
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
}
export {};
