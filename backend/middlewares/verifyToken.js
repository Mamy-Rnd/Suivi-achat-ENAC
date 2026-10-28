const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        return res.status(400).json({
            success: false,
            message: "Token manquante"
        })
    }

    const token = authHeaders.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "SECRET_KEY");
        req.user = decoded;
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = verifyToken;