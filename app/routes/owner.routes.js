const controller = require("../controllers/owner.controller");
const jwtAuth = require('../middlewares/jwtAuthMiddleware');

module.exports = function(app) {
 

app.post(
    "/api/owners/reset-password/:token",
    controller.setPassword
  );

  app.post("/api/owners/login", controller.login);

  app.get('/api/owners/properties', jwtAuth, controller.getOwnerProperties);


  
};

