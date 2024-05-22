const nodemailer = require("nodemailer");
require("dotenv").config();

const sendContactEmail = async (name, email, message) => {
  // Validate option
  if (!email || !message) {
    throw new Error("Invalid email options");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_EMAIL, // Your email address to receive the contact form submissions
    subject: `Contact form submission from ${name}`,
    text: message,
    html: `<p>You have a new contact form submission</p>
            <h3>Contact Details</h3>
            <ul>
              <li>Name: ${name}</li>
              <li>Email: ${email}</li>
            </ul>
            <h3>Message</h3>
            <p>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendContactEmail;
