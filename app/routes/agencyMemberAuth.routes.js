const express = require('express');
const router = express.Router();
const controller = require("../controllers/agencyMemberAuth.controller");

router.post("/api/agency-members/register", controller.signup);
router.post("/api/agency-members/login", controller.signin);
router.post("/api/agency-members/signout", controller.signout);

module.exports = router;