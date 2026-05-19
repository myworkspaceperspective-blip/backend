import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtPayload } from '../auth/strategies/jwt.strategy';
interface RequestWithUser extends Request {
    user: JwtPayload;
}
export declare class CartController {
    private cart;
    constructor(cart: CartService);
    getCart(req: RequestWithUser): Promise<{}>;
    addToCart(req: RequestWithUser, dto: AddToCartDto): Promise<{}>;
    updateItem(req: RequestWithUser, itemId: string, dto: UpdateCartDto): Promise<{}>;
    removeItem(req: RequestWithUser, itemId: string): Promise<{}>;
    clearCart(req: RequestWithUser): Promise<{
        message: string;
    }>;
    getAdminStats(): Promise<{
        totalOrders: number;
        revenue: number;
    }>;
}
export {};
