const router = require('express').Router();
const transporter = require('../services/email.service');
const { BookingRequest } = require('../model');
const { generateDriverDetailsTemplate, generateDeclineTemplate } = require('../utils/emailTemplates');

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

    // Generate the modern driver details email template
    const html = generateDriverDetailsTemplate({
      route: bookingRequest.route,
      date: bookingRequest.date,
      time: bookingRequest.time
    }, driverDetails);

    await transporter.sendMail({
      from: `"MakeRide Admin" <${process.env.EMAIL_USER}>`,
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
    // Generate the modern decline email template
    const html = generateDeclineTemplate(route, reason);
    
    await transporter.sendMail({ 
      from: `"MakeRide Admin" <${process.env.EMAIL_USER}>`, 
      to: email, 
      subject: "📝 Booking Update - MakeRide", 
      html 
    });
    res.json({ message: 'Decline email sent successfully' });
  } catch (err) { res.status(500).json({ error: 'Failed to send decline email' }); }
});

module.exports = router;
