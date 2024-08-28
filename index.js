const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'Elektronik', category: 'Elektronik' },
  { id: 2, name: 'Perabotan', category: 'Perabotan' }
];

// Soal 1. GET semua produk
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Soal 2. GET produk berdasarkan ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Soal 3. POST produk baru
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Soal 4. PUT update produk
app.put('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = { id: productId, ...req.body };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Soal 5. DELETE produk
app.delete('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter(p => p.id !== productId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running at <http://localhost>:${port}`);
});