import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from '../models/Blog.js';

dotenv.config();

const seedBlogs = [
  { title: '10 Free Tools to Speed Up Your Windows PC', slug: 'free-tools-speed-up-windows', content: 'Is your Windows PC running slow? Here are 10 free tools that can help speed it up. From disk cleanup utilities to startup managers, these tools will breathe new life into your machine. Tools like CCleaner, Autoruns, and Defraggler can make a significant difference in your system performance without costing a penny.', tags: ['windows', 'optimization', 'free', 'pc-speed'], category: 'Tech Tips', views: 42 },
  { title: 'How to Use AnyDesk for Remote IT Support', slug: 'anydesk-remote-support-guide', content: 'AnyDesk is one of the most popular remote desktop applications for IT support. This guide walks you through setting up AnyDesk, connecting to a remote machine, and troubleshooting common issues. Learn about the security features including permission-based access and end-to-end encryption.', tags: ['anydesk', 'remote-support', 'tutorial', 'remote-desktop'], category: 'Remote Support', views: 38 },
  { title: 'Common Computer Errors and How to Fix Them', slug: 'common-computer-errors-fix', content: 'From Blue Screen of Death to DLL errors, computer problems can be frustrating. This guide covers the most common Windows errors and provides step-by-step solutions. Learn how to interpret error codes, use System Restore, and when to seek professional help.', tags: ['errors', 'troubleshooting', 'windows', 'fix'], category: 'Troubleshooting', views: 56 },
  { title: 'Beginner\'s Guide to Digital Marketing in 2025', slug: 'beginners-digital-marketing-guide', content: 'Digital marketing is essential for any business in 2025. This beginner-friendly guide covers SEO, social media marketing, email marketing, and paid advertising. Learn how to create a digital marketing strategy that works for your business, even on a tight budget.', tags: ['digital-marketing', 'seo', 'social-media', 'guide'], category: 'Marketing', views: 27 },
  { title: 'WiFi vs Ethernet: Which is Better for Your Setup?', slug: 'wifi-vs-ethernet', content: 'The age-old debate: WiFi vs Ethernet. We break down the pros and cons of each connection type. WiFi offers convenience and mobility, while Ethernet provides stability and speed. Your choice depends on your specific needs — gaming, streaming, or general browsing.', tags: ['wifi', 'ethernet', 'network', 'internet'], category: 'Networking', views: 31 },
  { title: 'Top 5 Free Online Courses to Learn Web Development', slug: 'free-web-development-courses', content: 'Want to learn web development but don\'t want to spend money? Here are the top 5 free online courses that teach HTML, CSS, JavaScript, and more. From freeCodeCamp to CS50, these courses are highly rated and completely free. Start your coding journey today.', tags: ['web-development', 'courses', 'free', 'learning'], category: 'Courses', views: 63 },
  { title: 'How to Recover Lost Data from Your Hard Drive', slug: 'data-recovery-guide', content: 'Losing important data can be stressful. This guide covers the basics of data recovery, including common causes of data loss, DIY recovery tools, and when to seek professional data recovery services. Remember: stop using the drive immediately after data loss to maximize recovery chances.', tags: ['data-recovery', 'hard-drive', 'backup', 'guide'], category: 'Data Recovery', views: 19 },
  { title: 'The Ultimate Guide to Social Media Marketing for Small Businesses', slug: 'social-media-marketing-guide', content: 'Social media marketing doesn\'t have to be complicated. This guide covers the most effective strategies for small businesses on Instagram, Facebook, and LinkedIn. Learn about content planning, engagement strategies, and how to measure your ROI.', tags: ['social-media', 'marketing', 'small-business', 'guide'], category: 'Marketing', views: 44 },
  { title: 'Understanding SSL Certificates: Why Your Website Needs One', slug: 'ssl-certificates-guide', content: 'SSL certificates are essential for website security and SEO. This article explains what SSL is, how it works, and why Google prioritizes HTTPS websites. Learn about different types of SSL certificates and how to install one on your site.', tags: ['ssl', 'security', 'website', 'https'], category: 'Web Security', views: 22 },
  { title: 'Gaming PC Optimization: Boost Your FPS in 2025', slug: 'gaming-pc-optimization', content: 'Get the most out of your gaming PC with these optimization tips. From driver updates to graphics settings, learn how to maximize FPS and reduce stuttering. We cover NVIDIA and AMD GPU optimization, Windows gaming mode, and the best tools for monitoring performance.', tags: ['gaming', 'optimization', 'fps', 'pc'], category: 'Gaming', views: 71 },
  { title: 'Cloud Storage Comparison: Google Drive vs OneDrive vs Dropbox', slug: 'cloud-storage-comparison', content: 'Choosing the right cloud storage service is important for both personal and business use. This comparison covers Google Drive, OneDrive, and Dropbox across pricing, storage limits, features, and integration with other tools.', tags: ['cloud-storage', 'google-drive', 'onedrive', 'dropbox'], category: 'Tech Tips', views: 35 },
  { title: 'How to Secure Your Home Network from Hackers', slug: 'secure-home-network', content: 'Home network security is more important than ever. Learn how to secure your WiFi, set up a firewall, use VPNs, and protect your IoT devices. These simple steps can significantly reduce your risk of being hacked.', tags: ['network-security', 'hacking', 'wifi', 'security'], category: 'Networking', views: 48 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Blog.deleteMany({});
    await Blog.insertMany(seedBlogs);
    console.log('Blogs seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seed();