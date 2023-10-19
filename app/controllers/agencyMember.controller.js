const db = require("../models");
const Owner = db.owner;
const Property = db.property;
const Room = db.room;
const Tenant = require("../models/tenant.model");
const nodemailer = require("nodemailer");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getAllOwners = async (req, res) => {
    try {
        const userRole = req.userRole;

        if (userRole != 'AGENCY_MEMBER')
            return res.status(403).send({ message: 'Unauthorized.' });
        const owners = await Owner.find();
        res.status(200).send(owners);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch owners', details: error.message });
    }
};

exports.getAllTenants = async (req, res) => {
    try {
        const userRole = req.userRole;

        if (userRole != 'AGENCY_MEMBER')
            return res.status(403).send({ message: 'Unauthorized.' });
        const tenants = await Tenant.find();
        res.status(200).send(tenants);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch tenants', details: error.message });
    }
};



exports.createTenantAccount = async (req, res) => {

  try {
    const userRole = req.userRole;

    if (userRole != 'AGENCY_MEMBER')
        return res.status(403).send({ message: 'Unauthorized.' });

    const existingTenant = await Tenant.findOne({ email: req.body.email });

    if (existingTenant) {
      return res.status(400).send({ message: 'Email already exists!' });
    }

    const tenant = new Tenant({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    });

    await tenant.save();

    const token = jwt.sign({ id: tenant._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    tenant.resetPasswordToken = token;
    tenant.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await tenant.save();
    console.log("Token saved to tenant.");

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: tenant.email,
      from: process.env.EMAIL_USERNAME,
      subject: "Mettez à jour votre mot de passe",
      text: `An account has been created for you as property owner. Please click on the following link to set your password:
      http://${req.headers.host}/api/tenants/reset-password/${token}\n\n
      If you did not request this, please ignore this email.`, // shortened for brevity
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).send({ message: 'Failed to send email', details: err.message });
      }
      return res.status(201).send({ message: 'Tenant account created successfully!' });
    });
  } catch (error) {
    console.error("Error in createTenantAccount:", error);
    return res.status(500).send({ message: 'Failed to create tenant account', details: error.message });
  }
};



exports.createOwnerAccount = async (req, res) => {
  try {
    const userRole = req.userRole;

    if (userRole != 'AGENCY_MEMBER')
        return res.status(403).send({ message: 'Unauthorized.' });
    // Check if email already exists
    const existingOwner = await Owner.findOne({ email: req.body.email });
    if (existingOwner) {
        return res.status(400).send({ message: 'Email already exists!' });
    }

    const owner = new Owner({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    await owner.save();

    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    owner.resetPasswordToken = token;
    owner.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await owner.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: owner.email,
      from: process.env.EMAIL_USERNAME,
      subject: "Set your password",
      text: `An account has been created for you as property owner. Please click on the following link to set your password:
      http://${req.headers.host}/api/owners/reset-password/${token}\n\n
      If you did not request this, please ignore this email.`,
    };

    transporter.sendMail(mailOptions);

    res.status(201).send({ message: 'Owner account created successfully!' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to create owner account', details: error.message });
  }
};