const express = require("express");
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieSession = require("cookie-session");
const jwtAuthMiddleware = require('./app/middlewares/jwtAuthMiddleware');

require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to facility management application." });
});

// Agency Member Routes
const agencyMember = require("./app/routes/agencyMember.routes");
const agencyMemberAuth = require("./app/routes/agencyMemberAuth.routes");

// Import routes
const propertyRoutes = require('./app/routes/property.routes');
const serviceRequestRoutes = require('./app/routes/serviceRequest.routes');
const serviceRoutes = require('./app/routes/service.routes');
const ownerRoutes = require('./app/routes/owner.routes');
const tenantRoutes = require('./app/routes/tenant.routes');
const commercialPropertyRoutes = require('./app/routes/commercialProperty.routes');

// Use routes
app.use('/api/owners/properties', jwtAuthMiddleware, propertyRoutes);
app.use(serviceRequestRoutes);
app.use(serviceRoutes);
app.use(ownerRoutes);
app.use(tenantRoutes);
app.use(agencyMember);
app.use(agencyMemberAuth);
app.use('/api', commercialPropertyRoutes);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

