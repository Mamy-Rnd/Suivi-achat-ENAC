const DepartementServices = require("../Service/departements.service");

const Ajouter = async (req, res, next) => {
    const { nom_departements } = req.body;

    try {
        const resultat = await DepartementServices.AddDepartements(nom_departements);

        return res.status(201).json({
            success: resultat.success,
            message: resultat.message
        })
    } catch (error) {
        next(error)
    }
}

const Afficher = async (req, res, next) => {

    try {
        const result = await DepartementServices.AfficherDepartements();

        return res.status(200).json({
            resultat: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { Afficher, Ajouter };