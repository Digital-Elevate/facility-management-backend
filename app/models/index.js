const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

// Liste des modèles à importer
const models = [
  "agencyMember",
  "commercialProperty",
  "complaint",
  "owner",
  "property",
  "rentPayment",
  "room",
  "serviceRequest",
  "tenant"
];

// Importation des modèles
models.forEach(model => {
  try {
    db[model] = require(`./${model}.model`);
  } catch (error) {
    console.error(`Erreur lors de l'importation du modèle ${model}:`, error.message);
  }
});

db.AGENCY_MEMBER_ROLE = ["ADMIN", "MANAGER"];

module.exports = db;
