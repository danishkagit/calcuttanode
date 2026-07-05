/**
 * Database Configuration Module
 * - Connects to MongoDB Atlas (MONGO_URI) in production
 * - Falls back to in-memory MongoDB for local development
 *   when Atlas is unreachable
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB
 * Tries Atlas first; if it fails, spins up a local in-memory instance
 */
const connectDB = async () => {
  // --- Try Atlas first ---
  if (process.env.MONGO_URI) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
      });

      console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
      attachListeners();
      return conn;
    } catch (error) {
      console.warn(`⚠️  Atlas unreachable (${error.message}). Falling back to local in-memory DB...`);
    }
  }

  // --- Fallback: in-memory MongoDB (mongodb-memory-server) ---
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB (in-memory) Connected: ${conn.connection.host}`);
    console.log('   ℹ  Data will NOT persist after server restart.');

    attachListeners();
    return conn;
  } catch (error) {
    console.error('❌ Failed to start in-memory MongoDB:', error.message);
    throw error;
  }
};

/**
 * Attach common connection event listeners
 */
function attachListeners() {
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected successfully');
  });
}

/**
 * Graceful shutdown — close DB connection
 */
const gracefulShutdown = async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed gracefully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during graceful shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

module.exports = connectDB;
