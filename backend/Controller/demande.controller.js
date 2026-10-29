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

    const limit = Number(req.query.limit) || 7;
    const page = Number(req.query.page) || 1;

    try {
        const result = await DemandeService.AfficherDemande(page, limit);

        return res.status(200).json({
            success: true,
            resultat: result
        })
    } catch (error) {
        next(error)
    }
}

const SendDemande = async (req, res, next) => {

    const { id } = req.params;

    try {
        const resultat = await DemandeService.EnvoyerDemande(id);

        return res.status(200).json({
            success: resultat.success,
            message: resultat.message
        })
    } catch (error) {
        next(error)
    }
}

const AccepterDemande = async (req, res, next) => {
    const { id } = req.params;

    try {
        const resultat = await DemandeService.AccepterDemande(id);

        if (!resultat.success) {
            return res.status(404).json({
                success: false,
                message: resultat.message
            });
        }

        return res.status(200).json({
            success: true,
            message: resultat.message
        })
    } catch (error) {
        next(error)
    }
}
module.exports = { AfficherDemande, AddDemande, SendDemande, AccepterDemande };