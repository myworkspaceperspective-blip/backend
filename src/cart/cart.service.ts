import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Redis } from '@upstash/redis';
import { ConfigService } from '@nestjs/config';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  private redis: Redis;
  private readonly CACHE_TTL = 300; // 5 minutes

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    this.redis = new Redis({
      url: this.config.getOrThrow<string>('UPSTASH_REDIS_REST_URL'),
      token: this.config.getOrThrow<string>('UPSTASH_REDIS_REST_TOKEN'),
    });
  }

  private cacheKey(userId: string): string {
    return `cart:${userId}`;
  }

  async getCart(userId: string) {
    const cached = await this.redis.get(this.cacheKey(userId)).catch(() => null);
    if (cached) return cached;

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

  async addToCart(userId: string, dto: AddToCartDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');
    if (product.stock < dto.quantity)
      throw new BadRequestException('Insufficient stock');

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
    } else {
      await this.prisma.cartItem.create({
        data: { cartId: cart.id, productId: dto.productId, quantity: dto.quantity },
      });
    }

    await this.redis.del(this.cacheKey(userId)).catch(() => null);
    return this.getCart(userId);
  }

  async updateItem(userId: string, itemId: string, dto: UpdateCartDto) {
    const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Cart item not found');

    if (dto.quantity === 0) {
      await this.prisma.cartItem.delete({ where: { id: itemId } });
    } else {
      await this.prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity: dto.quantity },
      });
    }

    await this.redis.del(this.cacheKey(userId)).catch(() => null);
    return this.getCart(userId);
  }

  async removeItem(userId: string, itemId: string) {
    const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item) throw new NotFoundException('Cart item not found');

    await this.prisma.cartItem.delete({ where: { id: itemId } });
    await this.redis.del(this.cacheKey(userId)).catch(() => null);
    return this.getCart(userId);
  }

  async clearCart(userId: string) {
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
}
