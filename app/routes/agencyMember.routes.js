const express = require('express');
const router = express.Router();
const controller = require("../controllers/agencyMember.controller");
const roleAuthorization = require("../middlewares/roleAuthorization");
const jwtAuthMiddleware = require('../middlewares/jwtAuthMiddleware');

router.get(
  "/api/agency-members/owners",
  jwtAuthMiddleware, roleAuthorization, controller.getAllOwners
);

router.get(
  "/api/agency-members/tenants",
  jwtAuthMiddleware, roleAuthorization, controller.getAllTenants
);

router.post(
  "/api/agency-members/create-tenant-account",
  jwtAuthMiddleware, roleAuthorization, controller.createTenantAccount
);

router.post(
  "/api/agency-members/create-owner-account",
  jwtAuthMiddleware, roleAuthorization, controller.createOwnerAccount
);

module.exports = router;
