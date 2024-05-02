const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (option) => {
  // Validate option
  if (!option || !option.email || !option.subject || !option.message) {
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
    from: "zakariasamir155@gmail.com",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
