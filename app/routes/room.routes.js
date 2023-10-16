const express = require('express');
const router = express.Router();
const roleAuthorization = require("../middlewares/roleAuthorization");
const roomController = require('../controllers/room.controller');
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

router.post("/api/room", jwtAuthMiddleware, roleAuthorization, roomController.createRoom);
router.get('/api/rooms-by-property/:id', jwtAuthMiddleware, roleAuthorization, roomController.getAllRoomsByProperty);
router.get('/api/rooms/:id', jwtAuthMiddleware, roleAuthorization, roomController.getRoomById);
router.put('/api/rooms/:id', jwtAuthMiddleware, roleAuthorization, roomController.updateRoom);
router.delete('/api/rooms/:id', jwtAuthMiddleware, roleAuthorization, propertyController.deleteProperty);

module.exports = router;
