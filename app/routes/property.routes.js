const express = require('express');
const router = express.Router();
const roleAuthorization = require("../middlewares/roleAuthorization");
const propertyController = require('../controllers/property.controller');
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');
const controller = require("../controllers/property.controller");

router.post("/api/properties", jwtAuthMiddleware, roleAuthorization, controller.createProperty);
router.get('/api/properties', jwtAuthMiddleware, roleAuthorization, propertyController.getAllProperties);
router.get('/api/properties/:id', jwtAuthMiddleware, roleAuthorization,propertyController.getPropertyById);
router.put('/api/properties/:id', jwtAuthMiddleware,roleAuthorization, propertyController.updateProperty);
router.delete('/api/properties/:id', jwtAuthMiddleware,roleAuthorization, propertyController.deleteProperty);

module.exports = router;
