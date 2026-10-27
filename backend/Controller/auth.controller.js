const AuthService = require("../Service/auth.service");

const Login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const resultat = await AuthService.Login(email, password);

        return res.status(201).json({
            success: resultat.success,
            message: resultat.message,
            token: resultat.token
        })
    } catch (error) {
        next(error)
    }
}

const Register = async (req, res, next) => {
    const { nom, prenom, email, password, role, departement_id } = req.body

    try {
        const result = await AuthService.Register(nom, prenom, email, password, role, departement_id);

        return res.status(200).json({
            success: result.success,
            message: result.message,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { Register, Login };