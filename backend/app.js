const express = require("express");
const cors = require("cors");
require("dotenv").config();

const metaRoutes = require("./routes/meta.routes");
const adminRoutes = require("./routes/admin.routes");
const airportRoutes = require("./routes/airport.routes");
const localRoutes = require("./routes/local.routes");
const outstationRoutes = require("./routes/outstation.routes");
const bookingRoutes = require("./routes/booking.routes");
const paymentRoutes = require("./routes/payments.routes");

const app = express();

// CORS + parsers
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Mount routes (paths preserved exactly as in your current API)
app.use(metaRoutes);
app.use(adminRoutes);
app.use(airportRoutes);
app.use(localRoutes);
app.use(outstationRoutes);
app.use(bookingRoutes);
app.use(paymentRoutes);

module.exports = app;
