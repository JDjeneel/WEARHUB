const router = require('express').Router();
const Product = require('../models/Product');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// GET /api/products?category=Saree&search=silk&page=1&limit=12
router.get('/', async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 12, 50);
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (search) filter.name = { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
    const [items, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Product.countDocuments(filter),
    ]);
    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (e) { next(e); }
});

router.get('/categories', (req, res) => res.json(Product.CATEGORIES));

router.get('/:id', async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (e) { next(e); }
});

router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    res.status(201).json(await Product.create(req.body));
  } catch (e) {
    if (e.name === 'ValidationError') return res.status(400).json({ message: e.message });
    next(e);
  }
});

router.put('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (e) {
    if (e.name === 'ValidationError') return res.status(400).json({ message: e.message });
    next(e);
  }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (e) { next(e); }
});

module.exports = router;
