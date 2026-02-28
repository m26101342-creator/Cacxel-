import express from 'express';
import { createServer as createViteServer } from 'vite';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Database from 'better-sqlite3';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database('cacxel.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    avatar TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    category TEXT,
    image TEXT,
    rating REAL,
    reviews INTEGER,
    sizes TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total REAL,
    status TEXT,
    items TEXT,
    date TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// Seed Data if empty
const productCount = db.prepare('SELECT count(*) as count FROM products').get() as { count: number };
if (productCount.count === 0) {
  const products = [
    {
      name: "Nike Lebron",
      description: "Created for the hardwood but taken to the streets, this icon brings the comfort and style you need.",
      price: 130,
      category: "Shoes",
      image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/873f2743-0570-466d-965a-0639b122490b/lebron-xx-basketball-shoes-CT1128.png", // Placeholder, will try to find better or use generic
      rating: 4.8,
      reviews: 120,
      sizes: JSON.stringify([37, 38, 39, 40, 41, 42])
    },
    {
      name: "Nike Air Max",
      description: "Bold, comfortable, and ready for anything. The Air Max delivers style and substance.",
      price: 85,
      category: "Shoes",
      image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/585e2cd2-4f2a-408c-a8ba-f89952cdf332/air-max-90-mens-shoes-6n3vKB.png",
      rating: 4.5,
      reviews: 85,
      sizes: JSON.stringify([38, 39, 40, 41, 42])
    },
    {
      name: "Adidas Ultraboost",
      description: "Experience energy return like never before with the Ultraboost.",
      price: 180,
      category: "Running",
      image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg",
      rating: 4.9,
      reviews: 200,
      sizes: JSON.stringify([39, 40, 41, 42, 43])
    },
    {
      name: "Puma RS-X",
      description: "Retro style meets modern comfort in the RS-X.",
      price: 110,
      category: "Casual",
      image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/391174/01/sv01/fnd/EEA/fmt/png/RS-X-Efekt-PRM-Sneakers",
      rating: 4.6,
      reviews: 95,
      sizes: JSON.stringify([38, 39, 40, 41])
    },
     {
      name: "Nike Dunk Low",
      description: "The 80s b-ball icon returns with classic details and throwback hoops flair.",
      price: 115,
      category: "Shoes",
      image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/dunk-low-retro-mens-shoes-5FQWGR.png",
      rating: 4.7,
      reviews: 310,
      sizes: JSON.stringify([38, 39, 40, 41, 42, 43, 44])
    }
  ];

  const insert = db.prepare('INSERT INTO products (name, description, price, category, image, rating, reviews, sizes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  products.forEach(p => insert.run(p.name, p.description, p.price, p.category, p.image, p.rating, p.reviews, p.sizes));
}

const SECRET_KEY = process.env.JWT_SECRET || 'cacxel-secret-key-123';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  
  // Auth
  app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = db.prepare('INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)').run(name, email, hashedPassword, 'https://picsum.photos/seed/user/200');
      const token = jwt.sign({ id: result.lastInsertRowid, email }, SECRET_KEY, { expiresIn: '7d' });
      res.json({ token, user: { id: result.lastInsertRowid, name, email, avatar: 'https://picsum.photos/seed/user/200' } });
    } catch (error) {
      res.status(400).json({ error: 'Email already exists' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar } });
  });

  // Products
  app.get('/api/products', (req, res) => {
    const { category, search } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND name LIKE ?';
      params.push(`%${search}%`);
    }

    const products = db.prepare(query).all(...params);
    res.json(products);
  });

  app.get('/api/products/:id', (req, res) => {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ error: 'Product not found' });
  });

  // Orders
  app.post('/api/orders', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
    
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      
      const { items, total } = req.body;
      const date = new Date().toISOString();
      const result = db.prepare('INSERT INTO orders (user_id, total, status, items, date) VALUES (?, ?, ?, ?, ?)').run(decoded.id, total, 'Completed', JSON.stringify(items), date);
      
      res.json({ success: true, orderId: result.lastInsertRowid });
    } catch (e) {
      res.status(401).json({ error: 'Invalid token' });
    }
  });

  app.get('/api/orders', (req, res) => {
     const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC').all(decoded.id);
      res.json(orders);
    } catch (e) {
      res.status(401).json({ error: 'Invalid token' });
    }
  });


  // Vite Middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
