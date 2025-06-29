const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send booking confirmation email
 */
exports.sendBookingConfirmation = async (booking, userEmail) => {
  try {
    // Format times for email
    const startTime = new Date(booking.startTime).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    const endTime = new Date(booking.endTime).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    const date = new Date(booking.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const mailOptions = {
      from: `"Meeting Room Booking System" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Booking Confirmation: ${booking.title}`,
      html: `
        <h2>Your Meeting Room is Booked!</h2>
        <p><strong>Meeting:</strong> ${booking.title}</p>
        <p><strong>Room:</strong> ${booking.roomName}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${startTime} - ${endTime}</p>
        <p><strong>Attendees:</strong> ${booking.attendeeCount}</p>
        <p><strong>Equipment:</strong> ${booking.requiredEquipment.join(', ') || 'None'}</p>
        <p>Thank you for using our Meeting Room Booking System.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    // Don't throw - we don't want email failures to break the booking process
    return { error: error.message };
  }
};

/**
 * Send booking cancellation email
 */
exports.sendCancellationNotification = async (booking, userEmail) => {
  try {
    const mailOptions = {
      from: `"Meeting Room Booking System" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Booking Cancelled: ${booking.title}`,
      html: `
        <h2>Your Meeting Room Booking has been Cancelled</h2>
        <p><strong>Meeting:</strong> ${booking.title}</p>
        <p><strong>Room:</strong> ${booking.roomName}</p>
        <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${new Date(booking.startTime).toLocaleTimeString()} - ${new Date(booking.endTime).toLocaleTimeString()}</p>
        <p>This booking has been successfully cancelled.</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Cancellation email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Cancellation email sending failed:', error);
    return { error: error.message };
  }
};