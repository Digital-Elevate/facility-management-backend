const controller = require("../controllers/tenant.controller");

module.exports = function(app) {

  app.post(
      "/api/tenants/reset-password/:token",
      controller.setPassword
    );

    app.post("/api/tenants/login", controller.login);

};

