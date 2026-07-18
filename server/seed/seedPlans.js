import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SubscriptionPlan from '../models/SubscriptionPlan.js';

dotenv.config();

const plans = [
  { name: 'Monthly Tune-Up', slug: 'monthly-tune-up', description: 'Monthly PC cleanup, performance optimization, and priority support.', price: 999, durationDays: 30, features: ['Monthly PC cleanup', 'Performance optimization', 'Priority email support', 'Security check', 'Driver updates'], badge: 'Most Popular', popularity: 120 },
  { name: 'Content Pass', slug: 'content-pass', description: 'Access to exclusive blog articles, video tutorials, and downloadable resources.', price: 199, durationDays: 30, features: ['Exclusive articles', 'Video tutorials', 'Downloadable resources', 'Ad-free reading', 'New content weekly'], badge: null, popularity: 85 },
  { name: 'Pro Retainer', slug: 'pro-retainer', description: 'Full IT support retainer with weekly check-ins, security audits, and 24/7 priority support.', price: 2499, durationDays: 30, features: ['Everything in Tune-Up', 'Weekly check-in calls', 'Full security audit', '24/7 priority support', 'Network monitoring', 'Business hours SLA'], badge: 'Best Value', popularity: 45 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    await SubscriptionPlan.deleteMany({});
    const created = await SubscriptionPlan.insertMany(plans);
    console.log(`Seeded ${created.length} subscription plans`);
    await mongoose.disconnect();
    console.log('Done');
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();
