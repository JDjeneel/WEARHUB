const mongoose = require('mongoose');

const CATEGORIES = ['Saree', 'Kurta', 'Shirt', 'Jeans', 'Dress', 'Footwear', 'Accessories'];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: CATEGORIES },
    price: { type: Number, required: true, min: 0 },
    sizes: [{ type: String }],
    color: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    stock: { type: Number, default: 0, min: 0 },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
module.exports.CATEGORIES = CATEGORIES;
