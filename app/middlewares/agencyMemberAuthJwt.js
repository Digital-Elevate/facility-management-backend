const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const AgencyMember = db.agencyMember;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,
            config.secret,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              next();
            });
};

isAdmin = (req, res, next) => {
    AgencyMember.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user.role === "ADMIN") {
        next();
        return;
    }

    res.status(403).send({ message: "Require Admin Role!" });
    return;
  });
};

isManager = (req, res, next) => {
    AgencyMember.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user.role === "MANAGER") {
        next();
        return;
    }

    res.status(403).send({ message: "Require Admin Role!" });
    return;
  });
};

isAgencyMember = (req, res, next) => {
    AgencyMember.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if(user) {
            next();
            return;
        }
    }
  );
};



const agencyMemberAuthJwt = {
  verifyToken,
  isAdmin,
  isManager,
  isAgencyMember
};
module.exports = agencyMemberAuthJwt;
