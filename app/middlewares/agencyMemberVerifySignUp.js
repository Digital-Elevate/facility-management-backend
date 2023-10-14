const db = require("../models");
const AgencyMember = db.agencyMember;

const checkDuplicateEmail = async (req, res, next) => {
    try {
        // Vérifiez si req.body existe
        if (!req.body) {
            return res.status(400).send({ message: "Le corps de la requête est vide!" });
        }

        // Vérifiez si req.body.email existe
        if (!req.body.email) {
            return res.status(400).send({ message: "L'email est requis!" });
        }

        // Email
        const user = await AgencyMember.findOne({ email: req.body.email }).exec();

        if (user) {
            return res.status(400).send({ message: "Failed! Email is already in use!" });
        }

        next();
    } catch (err) {
        res.status(500).send({ message: err });
    }
};


const agencyMemberVerifySignUp = {
  checkDuplicateEmail
};

module.exports = agencyMemberVerifySignUp;
