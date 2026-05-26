"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ORDER_INCLUDE = {
    items: {
        include: {
            product: { include: { category: true } },
        },
    },
    user: { select: { id: true, name: true, email: true } },
};
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async placeOrder(userId, dto) {
        const productIds = dto.items.map((i) => i.productId);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds } },
        });
        if (products.length !== productIds.length) {
            throw new common_1.BadRequestException('One or more food items not found');
        }
        const orderItems = dto.items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
            };
        });
        const total = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const order = await this.prisma.order.create({
            data: {
                userId,
                total,
                address: dto.address,
                phone: dto.phone,
                note: dto.note,
                paymentMethod: dto.paymentMethod ?? 'DEMO_CARD',
                items: {
                    create: orderItems,
                },
            },
            include: ORDER_INCLUDE,
        });
        const cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (cart) {
            await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        }
        return order;
    }
    async getUserOrders(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: ORDER_INCLUDE,
            orderBy: { createdAt: 'desc' },
        });
    }
    async getOrderById(id, userId) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: ORDER_INCLUDE,
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (userId && order.userId !== userId)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async getAllOrders() {
        return this.prisma.order.findMany({
            include: ORDER_INCLUDE,
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateStatus(id, dto) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return this.prisma.order.update({
            where: { id },
            data: { status: dto.status },
            include: ORDER_INCLUDE,
        });
    }
    async getAdminStats() {
        const [totalOrders, revenue, pendingOrders] = await Promise.all([
            this.prisma.order.count(),
            this.prisma.order.aggregate({ _sum: { total: true } }),
            this.prisma.order.count({ where: { status: 'PENDING' } }),
        ]);
        return {
            totalOrders,
            revenue: revenue._sum.total ?? 0,
            pendingOrders,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map