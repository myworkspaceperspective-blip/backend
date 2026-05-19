import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtPayload } from '../auth/strategies/jwt.strategy';

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('cart')
export class CartController {
  constructor(private cart: CartService) {}

  @Get()
  getCart(@Req() req: RequestWithUser) {
    return this.cart.getCart(req.user.sub);
  }

  @Post()
  addToCart(@Req() req: RequestWithUser, @Body() dto: AddToCartDto) {
    return this.cart.addToCart(req.user.sub, dto);
  }

  @Patch(':itemId')
  updateItem(
    @Req() req: RequestWithUser,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateCartDto,
  ) {
    return this.cart.updateItem(req.user.sub, itemId, dto);
  }

  @Delete(':itemId')
  removeItem(@Req() req: RequestWithUser, @Param('itemId') itemId: string) {
    return this.cart.removeItem(req.user.sub, itemId);
  }

  @Delete()
  clearCart(@Req() req: RequestWithUser) {
    return this.cart.clearCart(req.user.sub);
  }

  @Roles('ADMIN')
  @Get('admin/stats')
  async getAdminStats() {
    const [totalOrders, revenue] = await Promise.all([
      this.cart.totalOrders(),
      this.cart.totalRevenue(),
    ]);
    return { totalOrders, revenue };
  }
}
