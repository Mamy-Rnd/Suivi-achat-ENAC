const express = require("express");
const router = express.Router();

const { AddDemande, AfficherDemande, SendDemande, AccepterDemande } = require("../Controller/demande.controller");
const verifyToken = require("../middlewares/verifyToken")

router.get("/demande", AfficherDemande);
router.post("/demande", verifyToken, AddDemande);
router.patch("/demande/:id/status", SendDemande);
router.patch("/demande/:id/status/accepter", AccepterDemande);

module.exports = router;