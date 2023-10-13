const { agencyMemberVerifySignUp } = require("../middlewares");
const controller = require("../controllers/agencyMemberAuth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/agency-members/register",
    [
      agencyMemberVerifySignUp.checkDuplicateEmail
    ],
    controller.signup
  );

  app.post("/api/agency-members/login", controller.signin);

  app.post("/api/agency-members/signout", controller.signout);
};
