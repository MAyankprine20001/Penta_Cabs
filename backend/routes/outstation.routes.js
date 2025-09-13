const router = require('express').Router();
const transporter = require('../services/email.service');
const { OutstationEntry } = require('../model');

// CRUD listing with pagination
router.get('/api/outstation-routes', async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip  = (page - 1) * limit;

    const routes = await OutstationEntry.find()
      .sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await OutstationEntry.countDocuments();

    res.json({
      routes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRoutes: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/api/outstation-routes/:id', async (req, res) => {
  try {
    const route = await OutstationEntry.findById(req.params.id);
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json(route);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/api/outstation-routes/:id', async (req, res) => {
  try {
    const route = await OutstationEntry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json({ message: 'Route updated successfully', route });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/api/outstation-routes/:id', async (req, res) => {
  try {
    const route = await OutstationEntry.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json({ message: 'Route deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/intercity/search
router.post('/api/intercity/search', async (req, res) => {
  const { city1, city2, tripType } = req.body;
  try {
    const entry = await OutstationEntry.findOne({
      city1: { $regex: `^${city1}$`, $options: 'i' },
      city2: { $regex: `^${city2}$`, $options: 'i' },
      tripType
    });
    if (!entry) return res.status(404).json({ message: "No intercity rides found for your selection." });
    const availableCars = entry.cars.filter(c => c.available === true);
    res.json({ cars: availableCars, distance: entry.distance });
  } catch (err) { res.status(500).json({ error: "Server error." }); }
});

// GET /api/available-outstation-cities
router.get('/api/available-outstation-cities', async (req, res) => {
  try {
    const entries = await OutstationEntry.find({ 'cars.available': true }).select('city1 city2 -_id');
    const fromCities = new Set();
    const map = {};
    entries.forEach(e => {
      fromCities.add(e.city1);
      (map[e.city1] ||= new Set()).add(e.city2);
    });
    const formatted = {};
    for (const from in map) formatted[from] = [...map[from]];
    res.json({ cityMap: formatted, fromCities: [...fromCities] });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// POST /send-route-email (outstation launch)
router.post('/send-route-email', async (req, res) => {
  const { email, route, cars } = req.body;
  if (!email || !route) return res.status(400).json({ error: 'Missing email or route' });

  try {
    const availableCars = (cars || [])
      .filter(c => c.available)
      .map(c => `<li><strong>${c.type.toUpperCase()}</strong>: ₹${c.price}</li>`).join('');

    await transporter.sendMail({
      from: `"MakeRide Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🚗 New Outstation Route Launched!',
      html: `
        <h2>🚗 New Outstation Cab Route: ${route}</h2>
        <p>Hello,</p>
        <p>We’re excited to announce a new outstation route: <strong>${route}</strong>.</p>
        <ul>${availableCars || '<li>No cars currently available</li>'}</ul>
        <p>✅ Book now!</p><br/><p><strong>MakeRide Team</strong></p>`
    });

    res.json({ message: 'Email sent successfully' });
  } catch (err) { res.status(500).json({ error: 'Email sending failed' }); }
});

// POST /send-intercity-email
router.post('/send-intercity-email', async (req, res) => {
  const { email, route, cab, traveller } = req.body;
  if (!email || !route || !cab) return res.status(400).json({ error: 'Missing required data' });
  try {
    const html = `
      <h2>🚖 Intercity Booking Confirmation</h2>
      <p><strong>Route:</strong> ${route}</p>
      <p><strong>Cab:</strong> ${cab.type.toUpperCase()} - ₹${cab.price}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      <hr/>
      <h3>🧍 Traveller Details</h3>
      <p><strong>Name:</strong> ${traveller.name}</p>
      <p><strong>Mobile:</strong> ${traveller.mobile}</p>
      <p><strong>Pickup:</strong> ${traveller.pickup}</p>
      <p><strong>Drop:</strong> ${traveller.drop}</p>
      <p><strong>Remark:</strong> ${traveller.remark || '-'}</p>
      <p><strong>GST:</strong> ${traveller.gst || '-'}</p>
      <br/><p><strong>MakeRide Team</strong></p>`;
    await transporter.sendMail({ from: `"MakeRide" <${process.env.EMAIL_USER}>`, to: email, subject: "🚖 Your Intercity Ride is Confirmed!", html });
    res.json({ message: "Email sent" });
  } catch (err) { res.status(500).json({ error: "Email failed to send" }); }
});

module.exports = router;
