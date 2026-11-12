import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure data storage directory exists
const DATA_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');
const WAITLIST_FILE = path.join(DATA_DIR, 'waitlist.json');

// Initial seed data for reviews if not exists
const initialReviews = [
  {
    id: 'rev-1',
    author: 'Elena Rostova',
    role: 'Creative Director at Studio Null',
    rating: 5,
    title: 'The Leica 35mm glass completely alters client calls',
    comment: 'The depth of field and natural bokeh on the Kimaro makes every presentation look like a high-budget commercial film. Zero distortion, natural skin tones.',
    date: '2026-10-12',
    verified: true,
    likes: 42
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    role: 'Keynote Speaker & Tech Architect',
    rating: 5,
    title: 'Dual-pixel autofocus follows eyes without breathing',
    comment: 'Most 4K webcams hunt for focus whenever you lean back. Kimaro locks on instantaneously with zero lens pulsing. The aluminum chassis is cold, dense, and indestructible.',
    date: '2026-10-28',
    verified: true,
    likes: 38
  },
  {
    id: 'rev-3',
    author: 'Dr. Sarah Lin',
    role: 'Neuroscience Researcher & Lecturer',
    rating: 5,
    title: 'Isolation microphone rejected construction noise completely',
    comment: 'I deliver remote symposium lectures while roadwork was happening 20 meters outside my window. The beamforming array filtered all low-frequency rumble.',
    date: '2026-11-04',
    verified: true,
    likes: 29
  }
];

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// Initialize seed data
if (!fs.existsSync(REVIEWS_FILE)) {
  writeJsonFile(REVIEWS_FILE, initialReviews);
}
if (!fs.existsSync(ORDERS_FILE)) {
  writeJsonFile(ORDERS_FILE, [
    {
      id: 'KMR-78291',
      createdAt: '2026-11-08T14:22:00Z',
      customer: {
        name: 'Alexander Grey',
        email: 'a.grey@designcraft.co',
        city: 'San Francisco, CA'
      },
      product: {
        model: 'Kimaro Studio Cube',
        finish: 'Matte Obsidian',
        lens: 'Leica 35mm F/1.8 ASPH',
        mount: 'Magnetic Precision Monitor Arm',
        engraving: 'GREY / 01'
      },
      addons: ['Studio Desk Heavy Arm', 'Anodized Privacy Cap'],
      total: 310,
      status: 'Optical Alignment & QC',
      estimatedDelivery: 'Nov 24, 2026'
    }
  ]);
}
if (!fs.existsSync(WAITLIST_FILE)) {
  writeJsonFile(WAITLIST_FILE, []);
}

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', brand: 'Kimaro Cam', timestamp: new Date().toISOString() });
});

// Products & Configuration specifications
app.get('/api/products', (req: Request, res: Response) => {
  res.json({
    brand: 'Kimaro',
    model: 'Kimaro Studio Cube 4K',
    tagline: 'Professional Webcam. DSLR Quality For The First Time on Webcam.',
    basePrice: 250,
    currency: 'USD',
    specs: {
      sensor: 'Sony STARVIS 2 Type 1/1.2" Back-Illuminated CMOS (2x Matrix Pixels)',
      lens: 'Leica 35mm equivalent F/1.8 ASPH (8 Elements in 6 Groups)',
      resolution: '4K TrueHDR at 60fps / 1080p Uncompressed at 120fps',
      audio: 'Dual-Capsule Acoustic Isolation Beamforming Array (-45dB DNR)',
      chassis: 'Solid Aircraft-Grade 6063-T6 CNC Machined Aluminum (215g)',
      connectivity: 'USB-C 3.2 Gen 2 (10Gbps) with Detachable Braided Cable',
      mount: 'Arca-Swiss Compatible + 1/4"-20 Thread + Magnetic Pivot'
    },
    finishes: [
      { id: 'obsidian', name: 'Matte Obsidian', hex: '#16171a', priceDelta: 0, description: 'Understated ultra-matte basalt powder coating' },
      { id: 'titanium', name: 'Cosmic Titanium', hex: '#44464f', priceDelta: 25, description: 'Brushed micro-bead blasted aerospace grade alloy' },
      { id: 'silver', name: 'Anodized Silver', hex: '#8c909a', priceDelta: 15, description: 'Raw machined aluminum with dual-tone beveled chamfer' },
      { id: 'bronze', name: 'Desert Bronze', hex: '#58493d', priceDelta: 30, description: 'Limited collector run with deep hand-finished patina' }
    ],
    lenses: [
      { id: 'leica-35', name: 'Leica 35mm F/1.8 ASPH', fov: '78° Cinematic', priceDelta: 0, isDefault: true },
      { id: 'noct-50', name: 'Noctilux Studio 50mm F/1.4', fov: '46° Natural Headshot', priceDelta: 45, isDefault: false },
      { id: 'wide-24', name: 'Ultra Wide 24mm F/2.0', fov: '94° Executive Boardroom', priceDelta: 30, isDefault: false }
    ],
    mounts: [
      { id: 'monitor', name: 'Magnetic Precision Monitor Perch', priceDelta: 0, isDefault: true },
      { id: 'heavy-arm', name: 'Kimaro Articulated Studio Desk Arm', priceDelta: 55, isDefault: false },
      { id: 'tripod-plate', name: 'Arca-Swiss Low Profile Desktop Stand', priceDelta: 35, isDefault: false }
    ],
    addons: [
      { id: 'privacy-cap', name: 'Magnetic Aluminum Privacy Shutter Cap', price: 20 },
      { id: 'filter-nd', name: 'Magnetic Variable ND 2-5 Stop Glass Filter', price: 40 },
      { id: 'braided-cable-3m', name: '3-Meter Ultra-Flex Braided 10Gbps USB-C Cable', price: 25 }
    ]
  });
});

// Orders & Preorders endpoints
app.get('/api/orders', (req: Request, res: Response) => {
  const orders = readJsonFile<any[]>(ORDERS_FILE, []);
  res.json({ count: orders.length, orders });
});

app.get('/api/orders/:id', (req: Request, res: Response) => {
  const orderId = req.params.id.trim().toUpperCase();
  const orders = readJsonFile<any[]>(ORDERS_FILE, []);
  const found = orders.find((o) => o.id.toUpperCase() === orderId);

  if (!found) {
    return res.status(404).json({ error: `Order or Preorder '${orderId}' not found.` });
  }

  res.json(found);
});

app.post('/api/orders', (req: Request, res: Response) => {
  const { customer, product, addons, paymentMethod, isPreorder } = req.body;

  if (!customer?.name || !customer?.email) {
    return res.status(400).json({ error: 'Customer name and valid email are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(customer.email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const orders = readJsonFile<any[]>(ORDERS_FILE, []);
  const orderNumber = Math.floor(10000 + Math.random() * 90000);
  const newOrderId = `KMR-${orderNumber}`;

  // Calculate pricing
  let total = 250;
  if (product?.finishPrice) total += Number(product.finishPrice);
  if (product?.lensPrice) total += Number(product.lensPrice);
  if (product?.mountPrice) total += Number(product.mountPrice);
  if (Array.isArray(addons)) {
    addons.forEach((addon: any) => {
      total += Number(addon.price || 0);
    });
  }

  const newOrder = {
    id: newOrderId,
    createdAt: new Date().toISOString(),
    isPreorder: Boolean(isPreorder),
    customer: {
      name: customer.name.trim(),
      email: customer.email.trim().toLowerCase(),
      address: customer.address || 'Standard Delivery',
      city: customer.city || 'Express Dispatch'
    },
    product: {
      model: 'Kimaro Studio Cube 4K',
      finish: product?.finish || 'Matte Obsidian',
      lens: product?.lens || 'Leica 35mm F/1.8 ASPH',
      mount: product?.mount || 'Magnetic Precision Monitor Perch',
      engraving: product?.engraving ? product.engraving.trim() : null
    },
    addons: addons || [],
    paymentMethod: paymentMethod || 'Card Checkout',
    total,
    status: isPreorder ? 'Batch Priority Reserved (Allocated)' : 'Confirmed — Preparing Assembly',
    estimatedDelivery: isPreorder ? 'December 2026 Batch 1' : '5-7 Business Days'
  };

  orders.unshift(newOrder);
  writeJsonFile(ORDERS_FILE, orders);

  res.status(201).json({
    success: true,
    message: isPreorder
      ? `Preorder successfully placed! Priority allocation token: ${newOrderId}`
      : `Order successfully placed! Tracking ID: ${newOrderId}`,
    order: newOrder
  });
});

// Reviews endpoints
app.get('/api/reviews', (req: Request, res: Response) => {
  const reviews = readJsonFile<any[]>(REVIEWS_FILE, initialReviews);
  const { minRating, sort } = req.query;

  let filtered = [...reviews];
  if (minRating) {
    const min = Number(minRating);
    filtered = filtered.filter((r) => r.rating >= min);
  }

  if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else {
    // Default newest
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  res.json({
    reviews: filtered,
    totalCount: reviews.length,
    averageRating: Number(averageRating),
    breakdown: {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length
    }
  });
});

app.post('/api/reviews', (req: Request, res: Response) => {
  const { author, role, rating, title, comment } = req.body;

  if (!author || !comment || !title || !rating) {
    return res.status(400).json({ error: 'Author, title, rating, and review text are required.' });
  }

  const parsedRating = Math.max(1, Math.min(5, Number(rating) || 5));
  const reviews = readJsonFile<any[]>(REVIEWS_FILE, initialReviews);

  const newReview = {
    id: `rev-${Date.now()}`,
    author: author.trim(),
    role: (role || 'Verified Creator').trim(),
    rating: parsedRating,
    title: title.trim(),
    comment: comment.trim(),
    date: new Date().toISOString().split('T')[0],
    verified: true,
    likes: 1
  };

  reviews.unshift(newReview);
  writeJsonFile(REVIEWS_FILE, reviews);

  res.status(201).json({
    success: true,
    message: 'Thank you for your feedback! Review published.',
    review: newReview
  });
});

// VIP waitlist / batch preorder notifications
app.post('/api/waitlist', (req: Request, res: Response) => {
  const { email, interest } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email address required.' });
  }

  const waitlist = readJsonFile<any[]>(WAITLIST_FILE, []);
  const normalized = email.trim().toLowerCase();

  if (waitlist.some((w) => w.email === normalized)) {
    return res.json({ success: true, message: "You're already on the priority list! We'll notify you first." });
  }

  waitlist.push({
    email: normalized,
    interest: interest || 'Kimaro Cam Batch 1',
    joinedAt: new Date().toISOString()
  });

  writeJsonFile(WAITLIST_FILE, waitlist);
  res.status(201).json({
    success: true,
    message: 'VIP reservation confirmed! Your priority dispatch token has been recorded.'
  });
});

// Contact / Enterprise support
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  res.json({
    success: true,
    message: `Thank you, ${name}. Our hardware acoustics & optics engineering team has received your inquiry.`
  });
});

// Dev vs Production Vite Middleware
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[Kimaro Server] Running at http://localhost:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
