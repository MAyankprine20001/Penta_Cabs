const mongoose = require('mongoose');

// Car sub-schema (shared)
const carSchema = new mongoose.Schema({
    type: { type: String, enum: ['sedan', 'suv', 'innova', 'crysta'] },
    available: { type: Boolean, default: false },
    price: { type: Number, default: 0 }
});

// Airport schema
const airportentrySchema = new mongoose.Schema({
    airportCity: String,
    airportName: String,
    airportCode: String,
    serviceType: { type: String, enum: ['drop', 'pick'] },
    otherLocation: String,
    dateTime: Date,
    distance: Number,
    cars: [carSchema]
}, { timestamps: true });

const AirportEntry = mongoose.model('AirportEntry', airportentrySchema);

// Outstation schema
const outstationSchema = new mongoose.Schema({
    city1: String,
    city2: String,
    dateTime: Date,
    distance: Number,
    tripType: { type: String, enum: ['one-way', 'two-way'], default: 'one-way' }, // ✅ new field
    cars: [carSchema]
}, { timestamps: true });
const OutstationEntry = mongoose.model('OutstationEntry', outstationSchema);

const localRideSchema = new mongoose.Schema({
    city: String,
    package: String,
    dateTime: Date,
    cars: [carSchema]
}, { timestamps: true });

const LocalRideEntry = mongoose.model('LocalRideEntry', localRideSchema);

// Add this to your exports
module.exports = { AirportEntry, OutstationEntry, LocalRideEntry };

