const express = require("express");
const router = express.Router();

const { AddDemande, AfficherDemande, SendDemande } = require("../Controller/demande.controller");
const verifyToken = require("../middlewares/verifyToken")

router.get("/demande", AfficherDemande);
router.post("/demande", verifyToken, AddDemande);
router.put("/demande/:id", SendDemande);

module.exports = router;