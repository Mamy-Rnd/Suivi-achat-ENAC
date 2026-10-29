const db = require("../Config/db");

const AjouterDemande = async (date_demande, designation, quantite, motif, departement_id, userId) => {

    const sql = "INSERT INTO demande_achat(date_demande,designation, quantite,motif,departement_id, user_id) VALUES(?,?,?,?,?,?)";
    const [resultat] = await db.query(sql, [date_demande, designation, quantite, motif, departement_id, userId]);

    return {
        success: true,
        message: "Vous avez ajouté un démande d'achat de matériel"
    }
}

const AfficherDemande = async (page = 1, limit = 6) => {


    const offset = (page - 1) * limit;

    const sql = "SELECT d.id,d.date_demande, d.designation, d.motif, d.quantite, d.status, c.nom_departements FROM demande_achat d INNER JOIN Departements c ON c.id=d.departement_id ORDER BY d.id DESC limit ? offset ?";

    const [rows] = await db.query(sql, [limit, offset]);

    const CountDemande = "SELECT COUNT(*) As total FROM demande_achat";

    const [count] = await db.query(CountDemande);

    const total = count[0].total;

    return {
        success: true,
        data: rows,
        page, limit, total, totalPage: Math.ceil(total / limit)
    }
}

const EnvoyerDemande = async (id) => {
    const sql = "UPDATE demande_achat SET status='transmise' WHERE id=?";

    const [resultat] = await db.query(sql, [id]);

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

const AccepterDemande = async (id) => {
    const sql = "UPDATE demande_achat SET status='validee' WHERE id=?";

    const [resultat] = await db.query(sql, [id]);

    if (resultat.affectedRows === 0) {
        return {
            success: false,
            message: "Demande introuvable"
        };
    }

    return {
        success: true,
        message: "Demande validé avec succès"
    }
}

module.exports = { AjouterDemande, AfficherDemande, EnvoyerDemande, AccepterDemande };