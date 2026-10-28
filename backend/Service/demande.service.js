const db = require("../Config/db");

const AjouterDemande = async (date_demande, designation, quantite, motif, departement_id, userId) => {

    const sql = "INSERT INTO demande_achat(date_demande,designation, quantite,motif,departement_id, user_id) VALUES(?,?,?,?,?,?,?ss)";
    const [resultat] = await db.query(sql, [date_demande, designation, quantite, motif, departement_id, userId]);

    return {
        success: true,
        message: "Vous avez ajouté un démande d'achat de matériel"
    }
}

const AfficherDemande = async () => {

    const sql = "SELECT*FROM demande_achat ORDER BY id DESC";

    const [rows] = await db.query(sql);

    return rows;
}

const EnvoyerDemande = async (id) => {
    const sql = "UPDATE demande_achat SET status='transmise' WHERE id=?";

    const resultat = await db.query(sql, [id]);

    if (resultat.affectedRows === 0) {
        return {
            success: false,
            message: "Demande introuvable"
        }
    }
    return {
        success: true,
        message: "Demande transmise avec succès"
    }
}

module.exports = { AjouterDemande, AfficherDemande, EnvoyerDemande };