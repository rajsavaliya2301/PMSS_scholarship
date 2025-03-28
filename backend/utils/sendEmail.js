const nodemailer = require("nodemailer");

const sendEmail = async (sendpass) => {
  try {
    // Define email credentials locally
    const emailUser = "23it106@charusat.edu.in";  // Replace with your Gmail address
    const emailPass = "eevkkqwmzpcsmivq";   // Replace with your Gmail password (use an App Password if 2FA is enabled)

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",                  // Use Gmail SMTP service
      auth: {
        user: emailUser,                 // Your Gmail address
        pass: emailPass,                 // Your Gmail password (or App Password if using 2FA)
      },
    });
    

    // Send email
    const info = await transporter.sendMail(sendpass);
    console.log(`Email Sent: ${info.messageId}`);  // Log success
    return true; // Return success status
  } catch (error) {
    console.error("Error Sending Email:", error.message);  // Log error
    return false; // Return failure status
  }
};

module.exports = sendEmail;
