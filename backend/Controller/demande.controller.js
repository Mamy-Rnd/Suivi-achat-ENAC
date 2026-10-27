const DemandeService = require("../Service/demande.service");

const AddDemande = async (req, res, next) => {
    const { date_demande, designation, quantite, motif, departement_id } = req.body;

    const userId = req.user.id;

    try {
        const resultat = await DemandeService.AjouterDemande(date_demande, designation, quantite, motif, departement_id, userId);

        return res.status(201).json({
            success: resultat.success,
            message: resultat.message
        })
    } catch (error) {
        next(error)
    }
}

const AfficherDemande = async (req, res, next) => {

    const userId = req.user.id;

    try {
        const result = await DemandeService.AfficherDemande(userId);

        return result;
    } catch (error) {
        next(error)
    }
}

module.exports = { AfficherDemande, AddDemande }