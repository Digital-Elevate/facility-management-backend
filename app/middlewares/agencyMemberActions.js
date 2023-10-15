const db = require("../models");
const Tenant = db.tenant;
const Owner = db.owner;
const Property = db.property;

checkTenantDuplicateEmail = async (req, res, next) => {
  try {
    const tenant = await Tenant.findOne({ email: req.body.email }).exec();

    if (tenant) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

checkOwnerDuplicateEmail = (req, res, next) => {
    // Email
    Owner.findOne({
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

checkOwnerId = (req, res, next) => {
    // Email
    Owner.findById(req.body.owner_id).exec((err, owner) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if(owner) {
            next();
            return;
        }
    }
  );

};

checkPropertyId = (req, res, next) => {
    // Email
    Property.findById(req.body.property_id).exec((err, property) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if(property) {
            next();
            return;
        }
    }
  );

};

const agencyMemberActions = {
  checkTenantDuplicateEmail,
  checkOwnerDuplicateEmail,
  checkOwnerId,
  checkPropertyId
};

module.exports = agencyMemberActions;
