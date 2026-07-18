import Service from '../models/Service.js';

export const getServices = async (req, res) => {
  try {
    const { category, sort, search, limit: limitStr } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = typeof category === 'string' ? category : String(category);
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { name: regex },
        { description: regex },
        { category: regex },
      ];
    }

    let sortOption = { popularityScore: -1 };
    if (sort === 'price-asc') sortOption = { price: 1 };
    else if (sort === 'price-desc') sortOption = { price: -1 };
    else if (sort === 'newest') sortOption = { createdAt: -1 };
    else if (sort === 'trending') sortOption = { trending: -1 };

    const limit = parseInt(limitStr) || 0;

    let query = Service.find(filter).sort(sortOption);
    if (limit > 0) query = query.limit(limit);

    const services = await query;
    await Service.updateMany(
      { _id: { $in: services.map(s => s._id) } },
      { $inc: { viewCount: 1 } }
    );

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrendingServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });
    const scored = services.map(s => ({
      ...s.toJSON(),
      popularityScore: (s.trending || 0) * 3 + (s.viewCount || 0) * 2 + (s.bookingCount || 0) * 5,
    }));
    scored.sort((a, b) => b.popularityScore - a.popularityScore);
    res.json(scored.slice(0, 6));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const incrementTrending = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, { $inc: { trending: 1 } }, { new: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Trending updated', trending: service.trending });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const incrementBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, {
      $inc: { bookingCount: 1, trending: 1 },
    }, { new: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Booking recorded', bookingCount: service.bookingCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
