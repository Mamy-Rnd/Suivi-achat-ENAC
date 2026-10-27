const db = require("../Config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Register = async (nom, prenom, email, password, role, departement_id) => {

    //verifier si email existe

    const [existEmail] = await db.query("SELECT*FROM users WHERE email = ?", [email]);

    if (existEmail.length > 0) {
        return {
            success: false,
            message: "Email déja utilisé!"
        }
    }

    const sql = "INSERT INTO users (nom, prenom, email,password,role,departement_id) VALUES (?,?,?,?,?,?)";

    const hashedPassword = await bcrypt.hash(password, 10);

    const [users] = await db.query(sql, [nom, prenom, email, hashedPassword, role, departement_id]);

    return {
        success: true,
        message: "Utilisateur crée avec succès"
    }
}

const Login = async (email, password) => {

    //chercher email

    const [userEmail] = await db.query("SELECT*FROM users WHERE email=?", [email]);

    if (userEmail.length <= 0) {
        return {
            success: false,
            message: "Email introuvable"
        }
    }

    const user = userEmail[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return {
            success: false,
            message: "Mot de passe incorrect"
        }
    }

    const token = jwt.sign({
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        departement: user.departement_id
    }, "SECRET_KEY", {
        expiresIn: "1h"
    })

    return {
        success: true,
        message: "Connexion réussie",
        token: token
    }
}

module.exports = { Login, Register };