import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.js';

dotenv.config();

const seedServices = [
  {
    name: 'Website Development',
    category: 'Website Development',
    price: 4999,
    features: ['5-page responsive site', 'Mobile-first design', 'Contact form integration', 'SEO basics setup', '1 month support'],
    trending: 100,
    viewCount: 1520,
    bookingCount: 88,
  },
  {
    name: 'Full Stack Web Development',
    category: 'Website Development',
    price: 14999,
    features: ['Custom frontend & backend', 'Database design (MongoDB/MySQL)', 'REST API development', 'User authentication & sessions', 'Deployment & hosting setup', '3 months support'],
    trending: 78,
    viewCount: 980,
    bookingCount: 45,
  },
  {
    name: 'E-Commerce Store Setup',
    category: 'Website Development',
    price: 7999,
    features: ['Product catalog setup', 'Payment gateway integration', 'Mobile optimized', 'Order management', 'Basic SEO'],
    trending: 85,
    viewCount: 1200,
    bookingCount: 62,
  },
  {
    name: 'Mobile App Development',
    category: 'App Development',
    price: 9999,
    features: ['Android & iOS apps', 'Cross-platform (React Native/Flutter)', 'API & backend integration', 'Push notifications', 'App store deployment assistance', '2 months support'],
    trending: 92,
    viewCount: 1350,
    bookingCount: 71,
  },
  {
    name: 'Digital Marketing',
    category: 'Marketing',
    price: 2999,
    features: ['Social media management (1 month)', 'Content calendar', 'Basic analytics & reporting', 'Monthly performance report'],
    trending: 90,
    viewCount: 1670,
    bookingCount: 95,
  },
  {
    name: 'SEO Optimization',
    category: 'Marketing',
    price: 1999,
    features: ['On-page SEO audit', 'Keyword research', 'Meta tags optimization', 'Google Search Console setup', 'Monthly report'],
    trending: 95,
    viewCount: 1890,
    bookingCount: 110,
  },
  {
    name: 'Performance Marketing',
    category: 'Marketing',
    price: 4999,
    features: ['Google/Facebook ads setup', 'Ad copy & creatives', 'Conversion tracking', 'A/B testing', 'Optimization (2 weeks)'],
    trending: 70,
    viewCount: 750,
    bookingCount: 38,
  },
  {
    name: 'Remote IT Support - Basic',
    category: 'Remote Support',
    price: 499,
    features: ['Remote desktop connection', 'Basic troubleshooting', 'Software installation', 'Email support'],
    trending: 60,
    viewCount: 2200,
    bookingCount: 156,
  },
  {
    name: 'Remote IT Support - Standard',
    category: 'Remote Support',
    price: 999,
    features: ['Everything in Basic', 'OS reinstallation help', 'Driver setup', 'Priority support', 'Follow-up session'],
    trending: 55,
    viewCount: 1450,
    bookingCount: 98,
  },
  {
    name: 'Remote IT Support - Premium',
    category: 'Remote Support',
    price: 1999,
    features: ['Everything in Standard', 'Network configuration', 'Security audit', 'Weekly check-in', '24/7 support'],
    trending: 40,
    viewCount: 890,
    bookingCount: 52,
  },
  {
    name: 'Network Troubleshooting',
    category: 'Troubleshooting',
    price: 799,
    features: ['WiFi/LAN diagnostics', 'Router configuration', 'DNS/firewall setup', 'Speed optimization'],
    trending: 50,
    viewCount: 1680,
    bookingCount: 112,
  },
  {
    name: 'OS Installation & Upgrade',
    category: 'Troubleshooting',
    price: 599,
    features: ['Windows/Linux/macOS install', 'Driver setup', 'Data backup before wipe', 'Basic configuration'],
    trending: 65,
    viewCount: 1350,
    bookingCount: 87,
  },
  {
    name: 'Gaming Error Troubleshooting',
    category: 'Troubleshooting',
    price: 399,
    features: ['FPS/drop issues', 'Crash diagnostics', 'Driver optimization', 'Settings tuning'],
    trending: 45,
    viewCount: 2100,
    bookingCount: 175,
  },
  {
    name: 'UI/UX Design',
    category: 'Design',
    price: 2999,
    features: ['Wireframes & sitemap', 'High-fidelity mockups', 'Figma source file', '2 revision rounds', 'Responsive layout'],
    trending: 75,
    viewCount: 890,
    bookingCount: 55,
  },
  {
    name: 'Graphics Design',
    category: 'Design',
    price: 999,
    features: ['Logo & brand identity', 'Social media posts', 'Business card design', 'Banner & flyer', 'Source files'],
    trending: 80,
    viewCount: 1750,
    bookingCount: 130,
  },
  {
    name: 'Video Editing',
    category: 'Design',
    price: 1499,
    features: ['Trim & cut', 'Transitions & effects', 'Background music', 'Text overlays', 'Social media export'],
    trending: 88,
    viewCount: 1420,
    bookingCount: 92,
  },
  {
    name: 'Data Recovery',
    category: 'Data Recovery',
    price: 1499,
    features: ['HDD/SSD/NVMe diagnostics', 'File recovery attempt', 'Free consultation', 'No recovery, no charge policy'],
    trending: 30,
    viewCount: 680,
    bookingCount: 28,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Service.deleteMany({});
    await Service.insertMany(seedServices);
    console.log('Services seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seed();
