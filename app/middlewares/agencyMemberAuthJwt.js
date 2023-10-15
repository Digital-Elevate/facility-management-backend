const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const AgencyMember = db.agencyMember;

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdminOrManager = async (req, res, next) => {
    try {
        const user = await AgencyMember.findById(req.userId).exec();
        if (user.role === "ADMIN" || user.role === "MANAGER") {
            next();
        } else {
            res.status(403).send({ message: "Require Admin or Manager Role!" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

isAgencyMember = async (req, res, next) => {
  try {
    const user = await AgencyMember.findById(req.userId).exec();
    if (user) {
      next();
    } else {
      res.status(403).send({ message: "Require Agency Member Role!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const agencyMemberAuthJwt = {
  verifyToken,
  isAgencyMember,
  isAdminOrManager 
};
module.exports = agencyMemberAuthJwt;
