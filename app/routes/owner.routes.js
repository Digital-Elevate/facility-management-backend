const controller = require("../controllers/owner.controller");

module.exports = function(app) {
 

app.post(
    "/api/owners/reset-password/:token",
    controller.setPassword
  );
  
};
