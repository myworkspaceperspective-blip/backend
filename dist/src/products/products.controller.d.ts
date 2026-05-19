import { ProductsService } from './products.service';
export declare class ProductsController {
    private products;
    constructor(products: ProductsService);
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        image: string;
        category: string;
        stock: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        image: string;
        category: string;
        stock: number;
    }>;
}
