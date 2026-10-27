require("dotenv").config()

const express = require("express");
const app = express();

const cors = require("cors");

require("./Config/db");

const errorHandling = require("./middlewares/errorHandling");
const authRoutes = require("./Routes/auth.Route");
const DepartementsRoutes = require("./Routes/departements.route");
const DemandeRoutes = require("./Routes/demande.route");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Projet suivi des achats matériels informatiques")
})

app.use("/api", authRoutes);
app.use("/api", DepartementsRoutes);
app.use("/api", DemandeRoutes);

app.use(errorHandling)
app.listen(process.env.PORT, () => {
    console.log("Serveur est lancé sur le port 3000");

})