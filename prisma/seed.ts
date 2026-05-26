import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

// Load .env only as fallback (shell env vars take priority)
if (!process.env.DATABASE_URL) {
  dotenv.config();
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });




const categories = [
  {
    name: 'Pizza',
    description: 'Hand-tossed, stone-baked Italian pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
  },
  {
    name: 'Fried Rice',
    description: 'Wok-tossed fried rice with fresh vegetables',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80',
  },
  {
    name: 'Noodles',
    description: 'Silky noodles in rich broths and sauces',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&q=80',
  },
  {
    name: 'Fries',
    description: 'Crispy golden fries with dipping sauces',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80',
  },
  {
    name: 'Rice Bowls',
    description: 'Hearty rice bowls with curries and gravies',
    image: 'https://images.unsplash.com/photo-1603431777007-61e2d95f9e5b?w=600&q=80',
  },
];

const foodItems = [
  // Pizza
  { name: 'Margherita Pizza', description: 'Classic tomato base, mozzarella, fresh basil', price: 299, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', categoryName: 'Pizza' },
  { name: 'Pepperoni Feast', description: 'Double pepperoni, mozzarella, oregano', price: 349, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80', categoryName: 'Pizza' },
  { name: 'BBQ Chicken Pizza', description: 'Smoky BBQ sauce, grilled chicken, onions', price: 379, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', categoryName: 'Pizza' },
  { name: 'Veggie Supreme', description: 'Bell peppers, mushrooms, olives, corn', price: 329, image: 'https://images.unsplash.com/photo-1511689660979-10d2b1eccb12?w=400&q=80', categoryName: 'Pizza' },

  // Fried Rice
  { name: 'Egg Fried Rice', description: 'Classic wok-tossed egg fried rice with soy sauce', price: 149, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80', categoryName: 'Fried Rice' },
  { name: 'Chicken Fried Rice', description: 'Tender chicken pieces with veggies and soy', price: 199, image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80', categoryName: 'Fried Rice' },
  { name: 'Vegetable Fried Rice', description: 'Mixed veggies, tofu, garlic butter', price: 169, image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&q=80', categoryName: 'Fried Rice' },
  { name: 'Prawn Fried Rice', description: 'Juicy prawns with scrambled egg and spring onion', price: 249, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', categoryName: 'Fried Rice' },

  // Noodles
  { name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with colorful vegetables', price: 159, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80', categoryName: 'Noodles' },
  { name: 'Chicken Chow Mein', description: 'Classic Chinese-style chicken noodles', price: 219, image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&q=80', categoryName: 'Noodles' },
  { name: 'Schezwan Noodles', description: 'Spicy Sichuan-style noodles, bold flavors', price: 189, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80', categoryName: 'Noodles' },
  { name: 'Pad Thai', description: 'Thai-style rice noodles with peanuts', price: 259, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&q=80', categoryName: 'Noodles' },

  // Fries
  { name: 'Classic Salted Fries', description: 'Crispy golden fries with sea salt', price: 99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80', categoryName: 'Fries' },
  { name: 'Peri-Peri Fries', description: 'Spiced with African peri-peri seasoning', price: 129, image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&q=80', categoryName: 'Fries' },
  { name: 'Cheese Fries', description: 'Loaded with cheddar sauce and jalapeños', price: 149, image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400&q=80', categoryName: 'Fries' },
  { name: 'Masala Fries', description: 'Indian masala spices, chat masala', price: 119, image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400&q=80', categoryName: 'Fries' },

  // Rice Bowls
  { name: 'Chicken Biryani Bowl', description: 'Aromatic basmati with marinated chicken', price: 249, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', categoryName: 'Rice Bowls' },
  { name: 'Dal Rice Bowl', description: 'Creamy lentil dal with steamed basmati', price: 149, image: 'https://images.unsplash.com/photo-1603431777007-61e2d95f9e5b?w=400&q=80', categoryName: 'Rice Bowls' },
  { name: 'Paneer Butter Masala Bowl', description: 'Rich paneer curry with basmati and naan', price: 229, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80', categoryName: 'Rice Bowls' },
  { name: 'Curd Rice Bowl', description: 'South Indian curd rice with pickle', price: 129, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400&q=80', categoryName: 'Rice Bowls' },
];

async function main() {
  console.log('🌱 Seeding Sarvarays Food Court database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sarvaraysfood.com' },
    update: {},
    create: {
      name: 'Sarvarays Admin',
      email: 'admin@sarvaraysfood.com',
      password: hashedPassword,
      role: 'ADMIN',
      isVerified: true,
    },
  });
  console.log('✅ Admin user:', admin.email);

  // Create demo user
  const userHash = await bcrypt.hash('User@123', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'user@sarvaraysfood.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'user@sarvaraysfood.com',
      password: userHash,
      role: 'USER',
      isVerified: true,
    },
  });
  console.log('✅ Demo user:', demoUser.email);

  // Seed categories
  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { name: cat.name },
      update: cat,
      create: cat,
    });
    categoryMap[cat.name] = created.id;
    console.log(`✅ Category: ${cat.name}`);
  }

  // Seed food items
  for (const item of foodItems) {
    const { categoryName, ...data } = item;
    await prisma.product.upsert({
      where: { id: `seed-${item.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: { ...data, categoryId: categoryMap[categoryName] },
      create: {
        id: `seed-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...data,
        categoryId: categoryMap[categoryName],
        stock: 100,
        isAvailable: true,
      },
    });
    console.log(`✅ Food item: ${item.name}`);
  }

  console.log('\n🎉 Sarvarays Food Court seeded successfully!');
  console.log('Admin login: admin@sarvaraysfood.com / Admin@123');
  console.log('User login:  user@sarvaraysfood.com / User@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

