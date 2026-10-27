const express = require("express");
const router = express.Router();

const { AddDemande, AfficherDemande } = require("../Controller/demande.controller");
const verifyToken = require("../middlewares/verifyToken")

router.get("/demande", verifyToken, AfficherDemande);
router.post("/demande", verifyToken, AddDemande);

module.exports = router;