const jwt = require("jsonwebtoken")

function verifyToken(req,res,next) {

    try {

        const token = req.headers.authorization.split(" ")[1] // Extraemos el Token del Header

        const payload = jwt.verify(token, process.env.TOKEN_SECRET)

        req.payload = payload;
        
        next() // continúa con la próxima ruta
    }
    catch (error) {
        res.status(401).json({errorMessage: "Invalid Token"})
    }
}


module.exports = verifyToken;
