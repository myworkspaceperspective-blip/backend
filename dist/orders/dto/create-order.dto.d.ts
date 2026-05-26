export declare class OrderItemDto {
    productId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    items: OrderItemDto[];
    address?: string;
    phone?: string;
    note?: string;
    paymentMethod?: string;
}
