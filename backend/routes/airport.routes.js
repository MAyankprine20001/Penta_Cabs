const router = require('express').Router();
const transporter = require('../services/email.service');
const { AirportEntry } = require('../model');
const { generateBookingConfirmationTemplate } = require('../utils/emailTemplates');

// GET /api/airport-services (pagination + search)
router.get('/api/airport-services', async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip  = (page - 1) * limit;

    let query = {};
    if (req.query.search) {
      query = { $or: [
        { airportCity:  { $regex: req.query.search, $options: 'i' } },
        { otherLocation:{ $regex: req.query.search, $options: 'i' } },
        { serviceType:  { $regex: req.query.search, $options: 'i' } },
      ]};
    }

    const services = await AirportEntry.find(query)
      .sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await AirportEntry.countDocuments(query);

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

router.get('/api/airport-services/:id', async (req, res) => {
  try {
    const service = await AirportEntry.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/api/airport-services/:id', async (req, res) => {
  try {
    const service = await AirportEntry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service updated successfully', service });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/api/airport-services/:id', async (req, res) => {
  try {
    const service = await AirportEntry.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/search-cabs-forairport
router.post('/api/search-cabs-forairport', async (req, res) => {
  const { serviceType, airportCity, otherLocation } = req.body;
  try {
    const sanitize = s => s.trim().toLowerCase();
    const entry = await AirportEntry.findOne({
      airportCity:   { $regex: new RegExp(`^${sanitize(airportCity)}$`, 'i') },
      otherLocation: { $regex: new RegExp(`^${sanitize(otherLocation)}$`, 'i') },
      serviceType
    });
    if (!entry) return res.status(404).json({ message: 'No matching cabs found.' });
    const availableCabs = entry.cars.filter(c => c.available);
    res.json({ cabs: availableCabs });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// GET /api/available-airports
router.get('/api/available-airports', async (req, res) => {
  try {
    const entries = await AirportEntry.find({ 'cars.available': true })
      .select('airportCity otherLocation serviceType -_id');

    const grouped = {};
    entries.forEach(e => {
      if (!grouped[e.airportCity]) grouped[e.airportCity] = { drop: new Set(), pick: new Set() };
      grouped[e.airportCity][e.serviceType].add(e.otherLocation);
    });

    const formattedResult = Object.entries(grouped).map(([city, services]) => ({
      airportCity: city,
      dropLocations: [...services.drop],
      pickLocations: [...services.pick]
    }));

    res.json({ airports: formattedResult });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// POST /send-airport-email (admin announcement)
router.post('/send-airport-email', async (req, res) => {
  const { email, route, cars } = req.body;
  if (!email || !route || !cars) {
    return res.status(400).json({ error: 'Missing email, route, or car data' });
  }
  try {
    const availableCars = cars.filter(c => c.available)
      .map(c => `<li><strong>${c.type.toUpperCase()}</strong>: ₹${c.price}</li>`).join('');
    await transporter.sendMail({
      from: `"MakeRide Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🛫 New Airport Route Now Available!',
      html: `<h2>🛫 New Airport Route: ${route}</h2>
             <ul>${availableCars || '<li>No cars currently available</li>'}</ul>
             <p>✅ Book now and enjoy reliable airport transfers.</p>`
    });
    res.json({ message: 'Email sent successfully' });
  } catch (err) { res.status(500).json({ error: 'Failed to send email' }); }
});

// POST /api/send-airport-email (booking confirmation)
router.post('/api/send-airport-email', async (req, res) => {
  const { email, route, cab, traveller, date, time, serviceType, otherLocation } = req.body;
  if (!email || !cab) return res.status(400).json({ error: 'Missing fields' });

  // Generate the modern email template
  const html = generateBookingConfirmationTemplate({
    serviceType: 'AIRPORT',
    route,
    car: cab,
    traveller: {
      ...traveller,
      email: email
    },
    date,
    time
  });

  try {
    await transporter.sendMail({
      from: `"MakeRide Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🛫 Airport ${serviceType === 'drop' ? 'Drop' : 'Pickup'} Booking Confirmation`,
      html
    });
    res.json({ message: 'Airport booking email sent successfully' });
  } catch (err) { 
    console.error('Email sending error:', err);
    res.status(500).json({ error: 'Email failed to send' }); 
  }
});

module.exports = router;
