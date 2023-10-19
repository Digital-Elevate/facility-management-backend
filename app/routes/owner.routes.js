const controller = require("../controllers/owner.controller");
const jwtAuth = require('../middlewares/jwtAuthMiddleware');
const express = require('express');
const router = express.Router();

router.post("/api/owners/reset-password/:token", controller.setPassword);
router.post("/api/owners/login", controller.login);
router.get('/api/owners/properties', jwtAuth, controller.getOwnerProperties);

module.exports = router;
