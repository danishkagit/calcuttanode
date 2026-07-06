import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  const mailOptions = {
    from: `"Calcutta Node" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

export default sendEmail;
