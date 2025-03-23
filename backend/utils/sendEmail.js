const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, studentId, password) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your PMSS Login Credentials",
      html: `<h2>Welcome to PMSS</h2>
             <p>Your Student ID: <b>${studentId}</b></p>
             <p>Your Password: <b>${password}</b></p>
             <p>Please keep this information safe.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email Sent: ${info.messageId}`);
  } catch (error) {
    console.error("❌ Error Sending Email:", error.message);
  }
};

module.exports = sendEmail;
