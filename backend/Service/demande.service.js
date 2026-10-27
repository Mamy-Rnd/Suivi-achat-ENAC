const db = require("../Config/db");

const AjouterDemande = async (date_demande, designation, quantite, motif, departement_id, userId) => {

    const sql = "INSERT INTO demande_achat(date_demande,designation, quantite,motif,departement_id, user_id) VALUES(?,?,?,?,?,?,?)";
    const [resultat] = await db.query(sql, [date_demande, designation, quantite, motif, departement_id, userId]);

    return {
        success: true,
        message: "Vous avez ajouté un démande d'achat de matériel"
    }
}

const AfficherDemande = async (userId) => {

    const sql = "SELECT*FROM demande_achat WHERE user_id=?";

    const [rows] = await db.query(sql, [userId]);

    return rows;
}

module.exports = { AjouterDemande, AfficherDemande };