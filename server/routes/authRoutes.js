import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, refreshToken, logout, getMe, googleLogin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import sendEmail from '../utils/sendEmail.js';
import ContactMessage from '../models/ContactMessage.js';

const router = Router();

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/register', authLimiter, registerValidation, register);
router.post('/login', authLimiter, loginValidation, login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.get('/me', protect, getMe);

router.post('/google', googleLogin);

router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }
    await ContactMessage.create({ name, email, phone, subject, message });
    await sendEmail({
      to: process.env.EMAIL_FROM,
      subject: `New Contact Form Submission from ${name}`,
      html: `<h2>New Contact Message</h2>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
             <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });
    res.json({ message: 'Message received. We will get back to you soon.' });
  } catch (error) {
    console.error('Contact email error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
