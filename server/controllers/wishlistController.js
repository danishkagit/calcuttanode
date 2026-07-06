import User from '../models/User.js';

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.savedServices || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const { serviceId } = req.body;
    const user = await User.findById(req.user._id);
    const index = user.savedServices.indexOf(serviceId);
    if (index > -1) {
      user.savedServices.splice(index, 1);
      await user.save();
      res.json({ saved: false, message: 'Removed from saved' });
    } else {
      user.savedServices.push(serviceId);
      await user.save();
      res.json({ saved: true, message: 'Service saved' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
