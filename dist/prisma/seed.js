"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../node_modules/.prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const adminPassword = await bcrypt.hash('Admin@1234', 12);
    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            name: 'Admin User',
            email: 'admin@example.com',
            password: adminPassword,
            role: client_1.Role.ADMIN,
            isVerified: true,
        },
    });
    const userPassword = await bcrypt.hash('User@1234', 12);
    await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            name: 'Test User',
            email: 'user@example.com',
            password: userPassword,
            role: client_1.Role.USER,
            isVerified: true,
        },
    });
    const products = [
        {
            name: 'Wireless Headphones',
            description: 'Premium noise-cancelling wireless headphones with 30h battery.',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
            category: 'Electronics',
            stock: 50,
        },
        {
            name: 'Mechanical Keyboard',
            description: 'RGB mechanical keyboard with Cherry MX switches.',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
            category: 'Electronics',
            stock: 30,
        },
        {
            name: 'Running Shoes',
            description: 'Lightweight and breathable running shoes for all terrains.',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
            category: 'Sports',
            stock: 100,
        },
        {
            name: 'Coffee Maker',
            description: 'Programmable 12-cup coffee maker with built-in grinder.',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
            category: 'Kitchen',
            stock: 25,
        },
        {
            name: 'Yoga Mat',
            description: 'Non-slip eco-friendly yoga mat 6mm thick.',
            price: 39.99,
            image: 'https://images.unsplash.com/photo-1601925228989-31e5c6a05d27?w=400',
            category: 'Sports',
            stock: 75,
        },
        {
            name: 'Smart Watch',
            description: 'Health tracking smartwatch with GPS and heart rate monitor.',
            price: 299.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
            category: 'Electronics',
            stock: 40,
        },
        {
            name: 'Backpack',
            description: '30L waterproof hiking backpack with laptop compartment.',
            price: 59.99,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
            category: 'Travel',
            stock: 60,
        },
        {
            name: 'Desk Lamp',
            description: 'LED desk lamp with adjustable brightness and USB charging port.',
            price: 44.99,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            category: 'Home',
            stock: 80,
        },
        {
            name: 'Water Bottle',
            description: 'Insulated stainless steel water bottle keeps drinks cold 24h.',
            price: 29.99,
            image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
            category: 'Sports',
            stock: 150,
        },
        {
            name: 'Notebook Set',
            description: 'Premium hardcover notebook set with dotted and lined pages.',
            price: 19.99,
            image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400',
            category: 'Stationery',
            stock: 200,
        },
    ];
    for (const product of products) {
        await prisma.product.upsert({
            where: { id: product.name },
            update: product,
            create: product,
        });
    }
    console.log('✅ Database seeded successfully');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map