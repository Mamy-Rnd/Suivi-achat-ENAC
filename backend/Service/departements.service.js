const db = require("../Config/db");

const AddDepartements = async (nom_departements) => {

    const [departements] = await db.query("INSERT INTO Departements(nom_departements) VALUES(?)", [nom_departements]);

    return {
        success: true,
        message: "Vous avez ajouté un département"
    }
}

const AfficherDepartements = async () => {
    const [rows] = await db.query("SELECT*FROM Departements");

    return rows;
}

module.exports = { AddDepartements, AfficherDepartements };