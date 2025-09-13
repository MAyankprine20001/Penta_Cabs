const router = require('express').Router();
const transporter = require('../services/email.service');
const { LocalRideEntry } = require('../model');

// GET /api/local-services (pagination + search)
router.get('/api/local-services', async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip  = (page - 1) * limit;

    let query = {};
    if (req.query.search) {
      query = { $or: [
        { city:    { $regex: req.query.search, $options: 'i' } },
        { package: { $regex: req.query.search, $options: 'i' } },
      ]};
    }

    const services = await LocalRideEntry.find(query)
      .sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await LocalRideEntry.countDocuments(query);

    res.json({
      services,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalServices: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET one
router.get('/api/local-services/:id', async (req, res) => {
  try {
    const service = await LocalRideEntry.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT update
router.put('/api/local-services/:id', async (req, res) => {
  try {
    const service = await LocalRideEntry.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service updated successfully', service });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// DELETE
router.delete('/api/local-services/:id', async (req, res) => {
  try {
    const service = await LocalRideEntry.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/local-ride/search
router.post('/api/local-ride/search', async (req, res) => {
  const { city, package: ridePackage } = req.body;
  try {
    const entry = await LocalRideEntry.findOne({
      city: { $regex: `^${city}$`, $options: 'i' },
      package: ridePackage,
    });
    if (!entry) return res.status(404).json({ message: "No rides found for the selected city and package." });
    const availableCars = entry.cars.filter(c => c.available);
    res.json({ cars: availableCars });
  } catch (err) { res.status(500).json({ error: "Server error." }); }
});

// GET /api/available-cities
router.get('/api/available-cities', async (req, res) => {
  try {
    const entries = await LocalRideEntry.find({ 'cars.available': true }).select('city -_id');
    const uniqueCities = [...new Set(entries.map(e => e.city))];
    res.json({ cities: uniqueCities });
  } catch (err) { res.status(500).json({ error: 'Internal server error' }); }
});

// POST /send-local-email
router.post('/send-local-email', async (req, res) => {
  const { email, route, car, traveller } = req.body;
  if (!email || !route || !car || !traveller) {
    return res.status(400).json({ error: 'Missing data for email' });
  }
  const html = `
    <h2>🚖 Local Ride Booking</h2>
    <p><strong>Route:</strong> ${route}</p>
    <p><strong>Car Selected:</strong> ${car.type.toUpperCase()} - ₹${car.price}</p>
    <hr />
    <h3>👤 Traveller Details</h3>
    <p><strong>Name:</strong> ${traveller.name}</p>
    <p><strong>Mobile:</strong> ${traveller.mobile}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Pickup:</strong> ${traveller.pickupAddress}</p>
    <p><strong>Drop:</strong> ${traveller.dropAddress}</p>
    <p><strong>Remark:</strong> ${traveller.remark}</p>
    ${traveller.gst ? `<p><strong>GST:</strong> ${traveller.gst}</p>` : ''}
    <br/><p>Thanks,<br/><strong>MakeRide Team</strong></p>`;
  try {
    await transporter.sendMail({ from: `"MakeRide Admin" <${process.env.EMAIL_USER}>`, to: email, subject: '🧾 Your Local Ride Booking Confirmation', html });
    res.json({ message: 'Local ride email sent' });
  } catch (err) { res.status(500).json({ error: 'Failed to send email' }); }
});

module.exports = router;
