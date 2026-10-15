// WARNING: this clears ALL users and products in the database, then adds sample data.
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');

const img = (t) => `https://placehold.co/600x750/e8eef2/1d2433?text=${encodeURIComponent(t)}`;

const products = [
  { name: 'Kanjivaram Silk Saree', category: 'Saree', price: 8999, sizes: ['Free'], color: 'Maroon', stock: 6 },
  { name: 'Cotton Chanderi Saree', category: 'Saree', price: 2499, sizes: ['Free'], color: 'Sky Blue', stock: 14 },
  { name: 'Embroidered Straight Kurta', category: 'Kurta', price: 1599, sizes: ['S', 'M', 'L', 'XL'], color: 'Mustard', stock: 20 },
  { name: 'Linen Casual Shirt', category: 'Shirt', price: 1299, sizes: ['M', 'L', 'XL'], color: 'White', stock: 25 },
  { name: 'Slim Fit Denim Jeans', category: 'Jeans', price: 1899, sizes: ['30', '32', '34'], color: 'Indigo', stock: 18 },
  { name: 'Floral Wrap Dress', category: 'Dress', price: 2199, sizes: ['S', 'M', 'L'], color: 'Green', stock: 10 },
  { name: 'Leather Kolhapuri Sandals', category: 'Footwear', price: 999, sizes: ['6', '7', '8', '9'], color: 'Tan', stock: 30 },
  { name: 'Handloom Cotton Dupatta', category: 'Accessories', price: 699, sizes: ['Free'], color: 'Red', stock: 40 },
].map((p) => ({ ...p, imageUrl: img(p.name), description: `${p.name} in ${p.color}.` }));

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Product.deleteMany({});
  await User.create({
    name: 'Admin', email: 'admin@wearhub.com', role: 'admin',
    password: await bcrypt.hash('admin123', 10),
  });
  await Product.insertMany(products);
  console.log('Seeded. Admin login: admin@wearhub.com / admin123');
  process.exit(0);
})();
