const router = require('express').Router();
const transporter = require('../services/email.service');
const { BookingRequest } = require('../model');

// POST /api/create-booking-request
router.post('/api/create-booking-request', async (req, res) => {
  try {
    const bookingRequest = new BookingRequest(req.body);
    await bookingRequest.save();
    res.status(201).json({ message: 'Booking request created successfully', bookingId: bookingRequest._id });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// GET /api/booking-requests (pagination)
router.get('/api/booking-requests', async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip  = (page - 1) * limit;

    const bookingRequests = await BookingRequest.find()
      .sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await BookingRequest.countDocuments();

    res.json({ bookingRequests, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/booking-requests/:id/status
router.put('/api/booking-requests/:id/status', async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const bookingRequest = await BookingRequest.findByIdAndUpdate(
      req.params.id, { status, adminNotes }, { new: true }
    );
    if (!bookingRequest) return res.status(404).json({ error: 'Booking request not found' });
    res.json({ message: 'Booking request status updated successfully', bookingRequest });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/booking-requests/:id/driver-details
router.put('/api/booking-requests/:id/driver-details', async (req, res) => {
  try {
    const { driverDetails } = req.body;
    const bookingRequest = await BookingRequest.findByIdAndUpdate(
      req.params.id, { driverDetails, status: 'driver_sent' }, { new: true }
    );
    if (!bookingRequest) return res.status(404).json({ error: 'Booking request not found' });

    const html = `
      <h2>🚖 Your Driver Details</h2>
      <p><strong>Route:</strong> ${bookingRequest.route}</p>
      <p><strong>Date:</strong> ${bookingRequest.date}</p>
      <p><strong>Time:</strong> ${bookingRequest.time}</p>
      <hr/>
      <h3>👨‍💼 Driver Information</h3>
      <p><strong>Name:</strong> ${driverDetails.name}</p>
      <p><strong>WhatsApp:</strong> ${driverDetails.whatsappNumber}</p>
      <p><strong>Vehicle Number:</strong> ${driverDetails.vehicleNumber}</p>
      <br/><p><strong>MakeRide Team</strong></p>`;

    await transporter.sendMail({
      from: `"MakeRide" <${process.env.EMAIL_USER}>`,
      to: bookingRequest.traveller.email,
      subject: "🚖 Your Driver Details - MakeRide",
      html
    });

    res.json({ message: 'Driver details added and email sent successfully', bookingRequest });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/send-decline-email
router.post('/api/send-decline-email', async (req, res) => {
  try {
    const { email, route, reason } = req.body;
    const html = `
      <h2>📝 Booking Update</h2>
      <p>We regret to inform you that we are unable to fulfill your booking request at this time.</p>
      <p><strong>Route:</strong> ${route}</p>
      <p><strong>Reason:</strong> ${reason || 'Service temporarily unavailable'}</p>
      <hr/><p>Sorry for the inconvenience.</p><br/><p><strong>MakeRide Team</strong></p>`;
    await transporter.sendMail({ from: `"MakeRide" <${process.env.EMAIL_USER}>`, to: email, subject: "📝 Booking Update - MakeRide", html });
    res.json({ message: 'Decline email sent successfully' });
  } catch (err) { res.status(500).json({ error: 'Failed to send decline email' }); }
});

module.exports = router;
