const express = require("express");
const router = express.Router();

const { Afficher, Ajouter } = require("../Controller/departements.controller");

router.get("/departements", Afficher);
router.post("/departements", Ajouter);

module.exports = router;