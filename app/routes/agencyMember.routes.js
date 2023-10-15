const { agencyMemberAuthJwt, agencyMemberActions } = require("../middlewares");
const controller = require("../controllers/agencyMember.controller");
const verifySignUp = require("../middlewares/agencyMemberVerifySignUp");
const { verifyToken, isAdmin } = require("../middlewares/agencyMemberAuthJwt");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/agency-members/create-tenant-account",
    [agencyMemberAuthJwt.verifyToken, agencyMemberAuthJwt.isAdmin, agencyMemberActions.checkTenantDuplicateEmail],
    controller.createTenantAccount
  );

  app.post(
    "/api/agency-members/create-owner-account",
    [agencyMemberAuthJwt.verifyToken, agencyMemberAuthJwt.isAdmin, agencyMemberActions.checkOwnerDuplicateEmail],
    controller.createOwnerAccount
  );

  app.post(
    "/api/properties",
    [agencyMemberAuthJwt.verifyToken, agencyMemberAuthJwt.isAgencyMember, agencyMemberActions.checkOwnerId],
    controller.createProperty
  );

  app.put(
    "/api/properties/:id",
    [agencyMemberAuthJwt.verifyToken, agencyMemberAuthJwt.isAgencyMember],
    controller.updateProperty
  );

  app.post(
    "/api/rooms",
    [agencyMemberAuthJwt.verifyToken, agencyMemberAuthJwt.isAgencyMember, agencyMemberActions.checkPropertyId],
    controller.createRoom
  );

  app.put(
    "/api/rooms/:id",
    [agencyMemberAuthJwt.verifyToken, agencyMemberAuthJwt.isAgencyMember],
    controller.updateRoom
  );

  app.get(
    "/api/agency-members/properties",
    [agencyMemberAuthJwt.verifyToken, agencyMemberAuthJwt.isAgencyMember],
    controller.getAllProperties
  );

  app.get(
    "/api/agency-members/rooms",
    [agencyMemberAuthJwt.verifyToken, agencyMemberAuthJwt.isAgencyMember],
    controller.getAllRooms
  );

  app.get(
    "/api/agency-members/owners",
    [agencyMemberAuthJwt.verifyToken, agencyMemberAuthJwt.isAgencyMember],
    controller.getAllOwners
  );

  app.get(
    "/api/agency-members/tenants",
    [agencyMemberAuthJwt.verifyToken, agencyMemberAuthJwt.isAgencyMember],
    controller.getAllTenants
  );

  app.post(
    "/api/agency-members/create-tenant-account", (req, res) => {
      console.log('Request body:', req.body);
    [
      verifySignUp.checkDuplicateEmail
    ],
    controller.createTenantAccount
  });



  app.post(
      "/api/agency-members/create-owner-account",
      [verifySignUp.checkDuplicateEmail],
      controller.createOwnerAccount
  );


};
