import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRoutes from './routes/leads.js';
import eventRoutes from './routes/events.js';

dotenv.config();

const app = express();

// Express configurations
app.use(cors({
  origin: '*', // Allow all origins for Vercel deployment, or configure properly
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection Caching for Serverless environment
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('CRITICAL: MONGODB_URI environment variable is missing.');
    return null;
  }

  try {
    // Keep connection options clean (Mongoose 6+ has these as defaults)
    const conn = await mongoose.connect(mongoUri);
    cachedConnection = conn;
    console.log('Successfully connected to MongoDB.');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return null;
  }
}

// Database connection middleware for routes
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

// Base health-check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    dbState: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Leads API endpoint
app.use('/api/leads', leadRoutes);

// Events (Click Tracking) API endpoint
app.use('/api/events', eventRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected server error occurred.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Run server locally if not on serverless host
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server listening locally at http://localhost:${PORT}`);
  });
}

export default app;
