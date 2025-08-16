// server.js
const express = require('express');
const mongoose = require('mongoose');
const { AirportEntry, OutstationEntry } = require('./model');
const { LocalRideEntry } = require('./model');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//  NEW (clean, no deprecated options)
mongoose.connect('mongodb+srv://Mayank20078657:Mayank20078657@cluster0.nxcumti.mongodb.net/AdminServiceforCabs')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API endpoint
app.post('/add-service', async (req, res) => {
  try {
    const entry = new AirportEntry(req.body);
    await entry.save();
    res.status(201).json({ message: 'Service entry saved' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const airportData = [
  // Delhi NCR Airports
  { name: "Indira Gandhi International Airport", iata: "DEL", city: "Delhi" },
  { name: "Hindon Airport", iata: "QAH", city: "Ghaziabad" }, // Civil enclave for Delhi NCR
  { name: "Noida International Airport (Jewar)", iata: "DXN", city: "Noida" }, // Under construction but worth including

  // Major Airports across India (original + 10 more)
  { name: "Chhatrapati Shivaji Maharaj International Airport", iata: "BOM", city: "Mumbai" },
  { name: "Kempegowda International Airport", iata: "BLR", city: "Bengaluru" },
  { name: "Rajiv Gandhi International Airport", iata: "HYD", city: "Hyderabad" },
  { name: "Sardar Vallabhbhai Patel International Airport", iata: "AMD", city: "Ahmedabad" },
  { name: "Cochin International Airport", iata: "COK", city: "Kochi" },
  { name: "Pune Airport", iata: "PNQ", city: "Pune" },
  { name: "Chennai International Airport", iata: "MAA", city: "Chennai" },
  { name: "Netaji Subhas Chandra Bose International Airport", iata: "CCU", city: "Kolkata" },
  { name: "Dabolim Airport", iata: "GOI", city: "Goa" },
  { name: "Lokpriya Gopinath Bordoloi International Airport", iata: "GAU", city: "Guwahati" },
  { name: "Jay Prakash Narayan Airport", iata: "PAT", city: "Patna" },
  { name: "Sri Guru Ram Dass Jee International Airport", iata: "ATQ", city: "Amritsar" },
  { name: "Dr. Babasaheb Ambedkar International Airport", iata: "NAG", city: "Nagpur" },
  { name: "Shaheed Bhagat Singh International Airport", iata: "IXC", city: "Chandigarh" },

  // ✈️ 10 more major airports
  { name: "Veer Savarkar International Airport", iata: "IXZ", city: "Port Blair" },
  { name: "Biju Patnaik International Airport", iata: "BBI", city: "Bhubaneswar" },
  { name: "Lal Bahadur Shastri International Airport", iata: "VNS", city: "Varanasi" },
  { name: "Birsa Munda Airport", iata: "IXR", city: "Ranchi" },
  { name: "Devi Ahilya Bai Holkar Airport", iata: "IDR", city: "Indore" },
  { name: "Maharaja Bir Bikram Airport", iata: "IXA", city: "Agartala" },
  { name: "Gaya International Airport", iata: "GAY", city: "Gaya" },
  { name: "Surat International Airport", iata: "STV", city: "Surat" },
  { name: "Tirupati Airport", iata: "TIR", city: "Tirupati" },
  { name: "Bagdogra Airport", iata: "IXB", city: "Siliguri" }
];



app.get('/api/airports', (req, res) => {
  res.json(airportData);
});


app.post('/add-outstation', async (req, res) => {
  try {
    const entry = new OutstationEntry(req.body);
    await entry.save();
    res.status(201).json({ message: 'Outstation booking saved' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all outstation routes with pagination
app.get('/api/outstation-routes', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalRoutes = await OutstationEntry.countDocuments();
    const routes = await OutstationEntry.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      routes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRoutes / limit),
        totalRoutes,
        hasNextPage: page < Math.ceil(totalRoutes / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    console.error('Error fetching outstation routes:', err);
    res.status(500).json({ error: 'Failed to fetch routes' });
  }
});

// Get single outstation route by ID
app.get('/api/outstation-routes/:id', async (req, res) => {
  try {
    const route = await OutstationEntry.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json(route);
  } catch (err) {
    console.error('Error fetching route:', err);
    res.status(500).json({ error: 'Failed to fetch route' });
  }
});

// Update outstation route
app.put('/api/outstation-routes/:id', async (req, res) => {
  try {
    const updatedRoute = await OutstationEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedRoute) {
      return res.status(404).json({ error: 'Route not found' });
    }
    
    res.json({ message: 'Route updated successfully', route: updatedRoute });
  } catch (err) {
    console.error('Error updating route:', err);
    res.status(500).json({ error: 'Failed to update route' });
  }
});

// Delete outstation route
app.delete('/api/outstation-routes/:id', async (req, res) => {
  try {
    const deletedRoute = await OutstationEntry.findByIdAndDelete(req.params.id);
    
    if (!deletedRoute) {
      return res.status(404).json({ error: 'Route not found' });
    }
    
    res.json({ message: 'Route deleted successfully', route: deletedRoute });
  } catch (err) {
    console.error('Error deleting route:', err);
    res.status(500).json({ error: 'Failed to delete route' });
  }
});

const nodemailer = require('nodemailer');

app.post('/send-route-email', async (req, res) => {
  const { email, route } = req.body;

  if (!email || !route) return res.status(400).json({ error: 'Missing email or route' });

  try {
  const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// const { email, route, cars } = req.body; // Make sure to send `cars` too

const availableCars = cars
  .filter(car => car.available)
  .map(car => `<li><strong>${car.type.toUpperCase()}</strong>: ₹${car.price}</li>`)
  .join('');

const mailOptions = {
  from: `"MakeRide Admin" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: '🚗 New Outstation Route Launched!',
  html: `
    <h2>🚗 New Outstation Cab Route: ${route}</h2>
    <p>Hello,</p>
    <p>We're excited to announce a new outstation travel route between <strong>${route}</strong>.</p>

    <p>Here are the available cab options for this route:</p>
    <ul>
      ${availableCars || '<li>No cars currently available</li>'}
    </ul>

    <p>✅ Book now and be the first to enjoy this new route!</p>
    <p>Visit our booking portal or contact us for details.</p>

    <br />
    <p>Thanks,</p>
    <p><strong>MakeRide Team</strong></p>
  `
};


    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Email sending failed' });
  }
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
app.post('/send-airport-email', async (req, res) => {
  const { email, route, cars } = req.body;

  if (!email || !route || !cars) {
    return res.status(400).json({ error: 'Missing email, route, or car data' });
  }

  try {
    const availableCars = cars
      .filter(car => car.available)
      .map(car => `<li><strong>${car.type.toUpperCase()}</strong>: ₹${car.price}</li>`)
      .join('');

    const mailOptions = {
      from: `"MakeRide Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🛫 New Airport Route Now Available!',
      html: `
        <h2>🛫 New Airport Route: ${route}</h2>
        <p>Hello,</p>
        <p>We’ve just launched a new airport cab route: <strong>${route}</strong>.</p>

        <p>Here are the available cab options:</p>
        <ul>
          ${availableCars || '<li>No cars currently available</li>'}
        </ul>

        <p>✅ Book now and enjoy reliable airport transfers.</p>
        <p>Visit our website to book your ride today!</p>

        <br />
        <p>Thanks,</p>
        <p><strong>MakeRide Team</strong></p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Save local ride
// app.post('/add-local', async (req, res) => {
//   try {
//     const entry = new LocalRideEntry(req.body);
//     await entry.save();
//     res.status(201).json({ message: 'Local ride saved' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
// Save multiple local rides
app.post('/add-local-bulk', async (req, res) => {
  try {
    const { entries } = req.body;

    if (!Array.isArray(entries) || entries.length !== 4) {
      return res.status(400).json({ error: 'Expected 4 entries for 4 packages' });
    }

    await LocalRideEntry.insertMany(entries);
    res.status(201).json({ message: 'All packages saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Email route
// app.post('/send-local-email', async (req, res) => {
//   const { email, route, cars } = req.body;

//   if (!email || !route || !cars) {
//     return res.status(400).json({ error: 'Missing email, route, or car data' });
//   }

//   try {
//     const availableCars = cars
//       .filter(car => car.available)
//       .map(car => `<li><strong>${car.type.toUpperCase()}</strong>: ₹${car.price}</li>`)
//       .join('');

//     const mailOptions = {
//       from: `"MakeRide Admin" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: '🛺 New Local Ride Package Available!',
//       html: `
//         <h2>🚖 Local Ride - ${route}</h2>
//         <p>Hello,</p>
//         <p>We've added a new local ride package in your city!</p>
//         <p><strong>Package:</strong> ${route}</p>
//         <p><strong>Available Cabs:</strong></p>
//         <ul>
//           ${availableCars || '<li>No cars currently listed</li>'}
//         </ul>
//         <p>✅ Book now and enjoy city rides with comfort.</p>
//         <br />
//         <p>Thanks,</p>
//         <p><strong>MakeRide Team</strong></p>
//       `
//     };

//     await transporter.sendMail(mailOptions);
//     res.json({ message: 'Local ride email sent' });
//   } catch (err) {
//     console.error('Email error:', err);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// })

const cities = require('./cities.json');

app.get('/api/cities', (req, res) => {
  res.json(cities);
});

// POST /api/local-ride/search cabs for user 
app.post('/api/local-ride/search', async (req, res) => {
  const { city, package: ridePackage } = req.body;

  try {
    const entry = await LocalRideEntry.findOne({
      city: { $regex: `^${city}$`, $options: 'i' }, // case-insensitive city match
      package: ridePackage,
    });

    if (!entry) {
      return res.status(404).json({ message: "No rides found for the selected city and package." });
    }

    const availableCars = entry.cars.filter(car => car.available);
    res.json({ cars: availableCars });

  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server error." });
  }
});


// POST /api/intercity/search - match city1, city2, and tripType
app.post('/api/intercity/search', async (req, res) => {
  const { city1, city2, tripType } = req.body;

  try {
    const entry = await OutstationEntry.findOne({
      city1: { $regex: `^${city1}$`, $options: 'i' }, // case-insensitive match
      city2: { $regex: `^${city2}$`, $options: 'i' },
      tripType
    });

    if (!entry) {
      return res.status(404).json({ message: "No intercity rides found for your selection." });
    }

    const availableCars = entry.cars.filter(car => car.available === true);

    res.json({ cars: availableCars, distance: entry.distance });
  } catch (err) {
    console.error("Intercity search error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

app.post('/api/search-cabs-forairport', async (req, res) => {
    const { serviceType, airportCity, otherLocation, date, time } = req.body;

    console.log('Received search:', req.body); // ✅ log input

    try {
       const sanitize = str => str.trim().toLowerCase();

const entry = await AirportEntry.findOne({
    airportCity: { $regex: new RegExp(`^${sanitize(airportCity)}$`, 'i') },
    otherLocation: { $regex: new RegExp(`^${sanitize(otherLocation)}$`, 'i') },
    serviceType
});


        if (!entry) {
            console.log('No matching entry found');
            return res.status(404).json({ message: 'No matching cabs found.' });
        }

        const availableCabs = entry.cars.filter(car => car.available);
        console.log('Available cabs:', availableCabs); // ✅ log matched cabs

        return res.json({ cabs: availableCabs });
    } catch (err) {
        console.error('Error searching cabs:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// allow users to see only the cities where cabs are available in databse of admin
// GET route to fetch cities where at least one car is available
app.get('/api/available-cities', async (req, res) => {
  try {
    const entries = await LocalRideEntry.find({
      'cars.available': true
    }).select('city -_id');

    // Extract unique city names
    const uniqueCities = [...new Set(entries.map(entry => entry.city))];

    res.json({ cities: uniqueCities });
  } catch (error) {
    console.error('Error fetching available cities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Update otherLocation options dynamically when a user selects an airportCity.
app.get('/api/available-airports', async (req, res) => {
  try {
    const entries = await AirportEntry.find({ 'cars.available': true })
      .select('airportCity otherLocation serviceType -_id');

    // Group data
    const result = {};

    entries.forEach(entry => {
      const { airportCity, otherLocation, serviceType } = entry;

      if (!result[airportCity]) {
        result[airportCity] = { drop: new Set(), pick: new Set() };
      }
      result[airportCity][serviceType].add(otherLocation);
    });

    // Convert Set to Array
    const formattedResult = Object.entries(result).map(([city, services]) => ({
      airportCity: city,
      dropLocations: [...services.drop],
      pickLocations: [...services.pick]
    }));

    res.json({ airports: formattedResult });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Options should be based on actual entries from the admin (from the OutstationEntry collection)
app.get('/api/available-outstation-cities', async (req, res) => {
  try {
    const entries = await OutstationEntry.find({ 'cars.available': true }).select('city1 city2 tripType -_id');

    const cityMap = {}; // city1 => { city2s: Set, tripTypes: Set }
    const fromCities = new Set();
    const allRoutes = [];

    entries.forEach(entry => {
      const { city1, city2, tripType } = entry;
      fromCities.add(city1);

      if (!cityMap[city1]) {
        cityMap[city1] = { city2s: new Set(), tripTypes: new Set() };
      }
      cityMap[city1].city2s.add(city2);
      cityMap[city1].tripTypes.add(tripType);

      // Add route information
      allRoutes.push({
        from: city1,
        to: city2,
        tripType: tripType
      });
    });

    // Convert to plain arrays and organize by trip type
    const formatted = {};
    for (const from in cityMap) {
      formatted[from] = {
        destinations: [...cityMap[from].city2s],
        tripTypes: [...cityMap[from].tripTypes]
      };
    }

    // Group routes by trip type for easier frontend consumption
    const routesByType = {
      'one-way': allRoutes.filter(route => route.tripType === 'one-way'),
      'two-way': allRoutes.filter(route => route.tripType === 'two-way')
    };

    res.json({ 
      cityMap: formatted, 
      fromCities: [...fromCities],
      routesByType,
      totalRoutes: allRoutes.length
    });
  } catch (err) {
    console.error('Error fetching available outstation cities:', err);
    res.status(500).json({ error: 'Failed to fetch available cities' });
  }
});


app.post('/send-local-email', async (req, res) => {
  const { email, route, car, traveller } = req.body;

  if (!email || !route || !car || !traveller) {
    return res.status(400).json({ error: 'Missing data for email' });
  }

  const htmlContent = `
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
    <br/>
    <p>Thanks,</p>
    <p><strong>MakeRide Team</strong></p>
  `;

  const mailOptions = {
    from: `"MakeRide Admin" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🧾 Your Local Ride Booking Confirmation',
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Local ride email sent' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.post('/send-intercity-email', async (req, res) => {
  const { email, route, cab, traveller } = req.body;

  if (!email || !route || !cab) {
    return res.status(400).json({ error: 'Missing required data' });
  }

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
      <br/>
      <p>Thanks,</p>
      <p><strong>MakeRide Team</strong></p>
    `;

    await transporter.sendMail({
      from: `"MakeRide" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🚖 Your Intercity Ride is Confirmed!",
      html
    });

    res.json({ message: "Email sent" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Email failed to send" });
  }
});

// API endpoint to populate outstation database with sample data
app.post('/api/populate-outstation', async (req, res) => {
  try {
    const sampleOutstationData = [
      {
        city1: "Delhi",
        city2: "Agra",
        dateTime: new Date(),
        distance: 200,
        tripType: "one-way",
        cars: [
          { type: "sedan", available: true, price: 2500 },
          { type: "suv", available: true, price: 3500 },
          { type: "innova", available: true, price: 4000 },
          { type: "crysta", available: true, price: 4500 }
        ]
      },
      {
        city1: "Delhi",
        city2: "Jaipur",
        dateTime: new Date(),
        distance: 280,
        tripType: "one-way",
        cars: [
          { type: "sedan", available: true, price: 3000 },
          { type: "suv", available: true, price: 4200 },
          { type: "innova", available: true, price: 4800 },
          { type: "crysta", available: true, price: 5500 }
        ]
      },
      {
        city1: "Mumbai",
        city2: "Pune",
        dateTime: new Date(),
        distance: 150,
        tripType: "one-way",
        cars: [
          { type: "sedan", available: true, price: 2000 },
          { type: "suv", available: true, price: 2800 },
          { type: "innova", available: true, price: 3200 },
          { type: "crysta", available: true, price: 3800 }
        ]
      },
      {
        city1: "Mumbai",
        city2: "Nashik",
        dateTime: new Date(),
        distance: 180,
        tripType: "one-way",
        cars: [
          { type: "sedan", available: true, price: 2200 },
          { type: "suv", available: true, price: 3100 },
          { type: "innova", available: true, price: 3600 },
          { type: "crysta", available: true, price: 4200 }
        ]
      },
      {
        city1: "Bangalore",
        city2: "Mysore",
        dateTime: new Date(),
        distance: 140,
        tripType: "one-way",
        cars: [
          { type: "sedan", available: true, price: 1800 },
          { type: "suv", available: true, price: 2500 },
          { type: "innova", available: true, price: 3000 },
          { type: "crysta", available: true, price: 3500 }
        ]
      },
      {
        city1: "Bangalore",
        city2: "Chennai",
        dateTime: new Date(),
        distance: 350,
        tripType: "one-way",
        cars: [
          { type: "sedan", available: true, price: 4500 },
          { type: "suv", available: true, price: 6200 },
          { type: "innova", available: true, price: 7200 },
          { type: "crysta", available: true, price: 8500 }
        ]
      },
      {
        city1: "Hyderabad",
        city2: "Warangal",
        dateTime: new Date(),
        distance: 160,
        tripType: "one-way",
        cars: [
          { type: "sedan", available: true, price: 2000 },
          { type: "suv", available: true, price: 2800 },
          { type: "innova", available: true, price: 3300 },
          { type: "crysta", available: true, price: 3900 }
        ]
      },
      {
        city1: "Chennai",
        city2: "Pondicherry",
        dateTime: new Date(),
        distance: 160,
        tripType: "one-way",
        cars: [
          { type: "sedan", available: true, price: 2000 },
          { type: "suv", available: true, price: 2800 },
          { type: "innova", available: true, price: 3300 },
          { type: "crysta", available: true, price: 3900 }
        ]
      },
      {
        city1: "Kolkata",
        city2: "Digha",
        dateTime: new Date(),
        distance: 180,
        tripType: "one-way",
        cars: [
          { type: "sedan", available: true, price: 2200 },
          { type: "suv", available: true, price: 3100 },
          { type: "innova", available: true, price: 3600 },
          { type: "crysta", available: true, price: 4200 }
        ]
      },
      {
        city1: "Ahmedabad",
        city2: "Vadodara",
        dateTime: new Date(),
        distance: 110,
        tripType: "one-way",
        cars: [
          { type: "sedan", available: true, price: 1500 },
          { type: "suv", available: true, price: 2100 },
          { type: "innova", available: true, price: 2500 },
          { type: "crysta", available: true, price: 3000 }
        ]
      }
    ];

    // Clear existing data
    await OutstationEntry.deleteMany({});
    console.log('Cleared existing outstation data');

    // Insert sample data
    const result = await OutstationEntry.insertMany(sampleOutstationData);
    console.log(`✅ Successfully added ${result.length} outstation routes to database`);
    
    res.json({ 
      message: `Successfully populated database with ${result.length} outstation routes`,
      routes: result.map(route => `${route.city1} → ${route.city2} (${route.distance} km)`)
    });

  } catch (error) {
    console.error('❌ Error populating outstation data:', error);
    res.status(500).json({ error: 'Failed to populate database' });
  }
});



app.post('/api/send-airport-email', async (req, res) => {
  const { email, route, cab, traveller, date, time, serviceType, otherLocation } = req.body;
  if (!email || !cab) return res.status(400).json({ error: 'Missing fields' });

  const html = `
    <h2>🛫 Airport ${serviceType === 'drop' ? 'Drop' : 'Pickup'} Booking Confirmed</h2>
    <p><strong>Route:</strong> ${route}</p>
    <p><strong>From/To:</strong> ${otherLocation}</p>
    <p><strong>Date & Time:</strong> ${date} at ${time}</p>
    <p><strong>Cab:</strong> ${cab.type.toUpperCase()} – ₹${cab.price}</p>
    <hr/>
    <h3>🧍 Traveller Details</h3>
    <p><strong>Name:</strong> ${traveller.name}</p>
    <p><strong>Mobile:</strong> ${traveller.mobile}</p>
    <p><strong>Pickup Address:</strong> ${traveller.pickup || '-'}</p>
    <p><strong>Drop Address:</strong> ${traveller.drop || '-'}</p>
    <p><strong>Remark:</strong> ${traveller.remark || '-'}</p>
    <p><strong>GST:</strong> ${traveller.gst || '-'}</p>
    <br/>
    <p>Thanks,</p>
    <p><strong>MakeRide Team</strong></p>
  `;

  try {
    await transporter.sendMail({
      from: `"MakeRide" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your Airport Ride Booking`,
      html
    });
    res.json({ message: 'Email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Email failed' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
