const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// CREATE Product
router.post('/add', async (req, res) => {
try {
const product = new Product(req.body);
await product.save();
res.send({ message: 'Product added successfully', product });
} catch (err) {
res.status(400).send(err);
}
});

// READ all Products
router.get('/all', async (req, res) => {
const products = await Product.find();
res.send(products);
});

// SEARCH by name or category
router.get('/search', async (req, res) => {
const { name, category } = req.query;
const query = {};

if (name) {
query.name = { $regex: name, $options: 'i' }; // case insensitive
}

if (category) {
query.category = { $regex: category, $options: 'i' };
}

const products = await Product.find(query);
res.send(products);
});

// PAGINATION
router.get('/paginate', async (req, res) => {
const page = parseInt(req.query.page) || 1;  // default page = 1
const limit = parseInt(req.query.limit) || 2; // default limit = 2 per page
const skip = (page - 1) * limit;

const products = await Product.find().skip(skip).limit(limit);
const total = await Product.countDocuments();

res.send({
currentPage: page,
totalProducts: total,
totalPages: Math.ceil(total / limit),
products
});
});

// SORT by price
router.get('/sort', async (req, res) => {
const { order } = req.query;

let sortOrder = 1; // ascending (low → high)

if (order === 'desc') {
sortOrder = -1; // descending (high → low)
}

const products = await Product.find().sort({ price: sortOrder });
res.send(products);
});


// UPDATE Product
router.put('/update/:id', async (req, res) => {
await Product.findByIdAndUpdate(req.params.id, req.body);
res.send({ message: 'Product updated successfully' });
});

// DELETE Product
router.delete('/delete/:id', async (req, res) => {
await Product.findByIdAndDelete(req.params.id);
res.send({ message: 'Product deleted successfully' });
});

router.get('/categories', async (req, res) => {
   const categories = await Product.distinct("category");
   res.send(categories);
});

module.exports = router;
