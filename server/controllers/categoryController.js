import Service from '../models/Service.js';
import Product from '../models/Product.js';

export const getCategories = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).lean();
    const products = await Product.find({ isActive: true }).lean();

    const categoryMap = {};

    for (const s of services) {
      if (!categoryMap[s.category]) {
        categoryMap[s.category] = {
          name: s.category,
          type: 'service',
          count: 0,
          totalBookings: 0,
          totalViews: 0,
          popularityScore: 0,
        };
      }
      categoryMap[s.category].count++;
      categoryMap[s.category].totalBookings += s.bookingCount || 0;
      categoryMap[s.category].totalViews += s.viewCount || 0;
      categoryMap[s.category].popularityScore += (s.trending || 0) * 3 + (s.viewCount || 0) * 2 + (s.bookingCount || 0) * 5;
    }

    const categories = Object.values(categoryMap).sort((a, b) => b.popularityScore - a.popularityScore);

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
