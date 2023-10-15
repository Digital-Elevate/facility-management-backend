const express = require('express');
const router = express.Router();
const controller = require("../controllers/commercialProperty.controller");

router.get("/owners/commercial-properties/:property_id/office-spaces", controller.getOfficeSpaces);


module.exports = router;
