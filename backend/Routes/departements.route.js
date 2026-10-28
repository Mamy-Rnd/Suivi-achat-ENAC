const express = require("express");
const router = express.Router();

const { Afficher, Ajouter } = require("../Controller/departements.controller");
const verifierRole = require("../middlewares/verifyRole");
const verifyToken = require("../middlewares/verifyToken");

router.get("/departements", Afficher);
router.post("/departements", verifyToken, verifierRole, Ajouter);

module.exports = router;