const express = require("express");
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("./app/config/db.config");
const jwtAuthMiddleware = require('./app/middlewares/jwtAuthMiddleware');
const app = express();
const propertyRoutes = require('./app/routes/property.routes');

app.use(express.json());
require('dotenv').config();

const ownerRoutes = require('./app/routes/owner.routes');
ownerRoutes(app);
const tenantRoutes = require('./app/routes/tenant.routes');
tenantRoutes(app);


const commercialPropertyRoutes = require('./app/routes/commercialProperty.routes');
const { $where } = require("./app/models/tenant.model");
app.use('/api/owners/properties', jwtAuthMiddleware); 
app.use(propertyRoutes);
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dbConfig.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(session({
  secret: 's3cr3tK3y!2023',
  resave: false,
  saveUninitialized: true
}));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to facility management application." });
});

require("./app/routes/agencyMember.routes")(app);
require("./app/routes/agencyMemberAuth.routes")(app);
app.use('/api', commercialPropertyRoutes);  
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
}