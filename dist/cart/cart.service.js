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
var CartService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_1 = require("@upstash/redis");
const config_1 = require("@nestjs/config");
let CartService = CartService_1 = class CartService {
    prisma;
    config;
    logger = new common_1.Logger(CartService_1.name);
    redis;
    CACHE_TTL = 300;
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
        this.redis = new redis_1.Redis({
            url: this.config.getOrThrow('UPSTASH_REDIS_REST_URL'),
            token: this.config.getOrThrow('UPSTASH_REDIS_REST_TOKEN'),
        });
    }
    cacheKey(userId) {
        return `cart:${userId}`;
    }
    async getCart(userId) {
        const cached = await this.redis.get(this.cacheKey(userId)).catch(() => null);
        if (cached)
            return cached;
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: { product: true },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        const result = cart ?? { items: [], userId };
        await this.redis
            .set(this.cacheKey(userId), JSON.stringify(result), { ex: this.CACHE_TTL })
            .catch(() => null);
        return result;
    }
    async addToCart(userId, dto) {
        const product = await this.prisma.product.findUnique({
            where: { id: dto.productId },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        if (product.stock < dto.quantity)
            throw new common_1.BadRequestException('Insufficient stock');
        let cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            cart = await this.prisma.cart.create({ data: { userId } });
        }
        const existing = await this.prisma.cartItem.findUnique({
            where: { cartId_productId: { cartId: cart.id, productId: dto.productId } },
        });
        if (existing) {
            await this.prisma.cartItem.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + dto.quantity },
            });
        }
        else {
            await this.prisma.cartItem.create({
                data: { cartId: cart.id, productId: dto.productId, quantity: dto.quantity },
            });
        }
        await this.redis.del(this.cacheKey(userId)).catch(() => null);
        return this.getCart(userId);
    }
    async updateItem(userId, itemId, dto) {
        const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });
        if (!item)
            throw new common_1.NotFoundException('Cart item not found');
        if (dto.quantity === 0) {
            await this.prisma.cartItem.delete({ where: { id: itemId } });
        }
        else {
            await this.prisma.cartItem.update({
                where: { id: itemId },
                data: { quantity: dto.quantity },
            });
        }
        await this.redis.del(this.cacheKey(userId)).catch(() => null);
        return this.getCart(userId);
    }
    async removeItem(userId, itemId) {
        const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });
        if (!item)
            throw new common_1.NotFoundException('Cart item not found');
        await this.prisma.cartItem.delete({ where: { id: itemId } });
        await this.redis.del(this.cacheKey(userId)).catch(() => null);
        return this.getCart(userId);
    }
    async clearCart(userId) {
        const cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (cart) {
            await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        }
        await this.redis.del(this.cacheKey(userId)).catch(() => null);
        return { message: 'Cart cleared' };
    }
    async totalOrders() {
        return this.prisma.cartItem.count();
    }
    async totalRevenue() {
        const items = await this.prisma.cartItem.findMany({
            include: { product: true },
        });
        return items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = CartService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], CartService);
//# sourceMappingURL=cart.service.js.map