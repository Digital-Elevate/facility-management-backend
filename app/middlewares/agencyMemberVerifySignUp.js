const db = require("../models");
const AgencyMember = db.agencyMember;

checkDuplicateEmail = (req, res, next) => {
    // Email
    AgencyMember.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });

};

const agencyMemberVerifySignUp = {
  checkDuplicateEmail
};

module.exports = agencyMemberVerifySignUp;
