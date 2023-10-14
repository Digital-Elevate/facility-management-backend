const config = require("../config/auth.config");
const db = require("../models");
const AgencyMember = db.agencyMember;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    if (!db.AGENCY_MEMBER_ROLE.includes(req.body.role)) {
      return res.status(400).json({ error: 'Invalid role value' });
    }

    const newUser = new AgencyMember({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    await newUser.save();
    res.status(201).json({ message: 'User was registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await AgencyMember.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res.status(404).send({ message: "Invalid Email or Password!" });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Email or Password!" });
    }

    const token = jwt.sign({ id: user.id },
                            config.secret,
                            {
                              algorithm: 'HS256',
                              allowInsecureKeySizes: true,
                              expiresIn: 86400, // 24 hours
                            });
 if (!req.session) {
    return res.status(500).send({ message: "Session not initialized" });
  }
    req.session.token = token;

    res.status(200).send({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
