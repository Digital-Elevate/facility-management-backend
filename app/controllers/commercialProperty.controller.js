const OfficeSpace = require("../models/officeSpace.model.js");

exports.getOfficeSpaces = (req, res) => {
  const propertyId = req.params.property_id;

  OfficeSpace.find({ property: propertyId })
    .populate('property')  
    .then(officeSpaces => {
      res.send(officeSpaces);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving office spaces."
      });
    });
};
