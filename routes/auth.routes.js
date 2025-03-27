const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth.middlewares")

// Models
const User = require("../models/User.model")



// Las rutas del auth


// Ruta POST "/api/auth/signup" => crear documento de usuario  (Funciona)
router.post("/signup", async(req, res, next) => {
    //res.json("Todo bien, probando el Signup") (se conecta)

    const { nombre, apellidos, password, email} = req.body

    if(!nombre || !apellidos || !password || !email) {
        res.status(400).json("Los campos son obligatorios")
        return // Debemos realizar un return para detener la ejecución y volver al Front End.
    }

    // Comprobación que nombre y apellidos no tengan caracteres especiales
    const charRegex = /^[a-zA-Z0-9ñÑ]+$/g; //Cuidado con el gm final
    if (charRegex.test(nombre) === false) {
        res.status(400).json({ errorMessage: "El nombre no debe incluir caracteres especiales." });
        return;
    }
    /*
    if (charRegex.test(apellidos) === false) {
        res.status(400).json({ errorMessage: "Los apellidos no deben incluir caracteres especiales." });
        return;
    }
        */

    // Comprobación fuerza Password
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if (passwordRegex.test(password) === false) {
        res.status(400).json({errorMessage: "Contraseña no es suficiente fuerte. Require al menos una mayuscula, una minuscula, un numero y 8 caracteres."})
        return;
        }

    // Comprobación formato email
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (emailRegex.test(email) === false) {
        res.status(400).json({ errorMessage: "El email no tiene el formato correcto." });
        return; 
    }  
    
    
    try {

        const foundUser = await User.findOne({email: email})
        if(foundUser !== null) {
            res.status(400).json({errorMessage: "Ya existe un usuario con ese email"})
            return;
        }

        // Aquí empezamos a crear el usuario tras comprobar que todos los datos son correctos
        const hashPassword = await bcrypt.hash(password, 12)

        await User.create({
            nombre: nombre,
            apellidos: apellidos,
            password: hashPassword,
            email: email
        })

        res.status(201).json("Usuario creado con éxito")
        
    } catch (error) {
        next(error)
    }

})


// Ruta POST "/api/auth/login" => validar credenciales del usuario y crear un Token

router.post("/login", async (req,res,next) => {

    const { email, password } = req.body

    // Los campos deben existir
    if(!email || !password) {
        res.status(400).json("Todos los campos son obligatorios")
        return;
    }

    // El formato del email debe ser correcto
    const emailRegex =/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (emailRegex.test(email) === false) {
        res.status(400).json({ errorMessage: "El email no tiene el formato correcto." });
        return;
    }

    
    try {

        // Que exista el usuario en la DB
        const foundUser = await User.findOne({email: email})

        if(foundUser === null) {
            res.status(400).json({errorMessage: "No se encuentra el usuario con ese email"})
            return;
        }

        // La contraseña debe coincidir con la del usuario en la DB
        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
        if(isPasswordCorrect === false) {
            res.status(400).json({errorMessage: "Contraseña incorrecta. Por favor, introduzca una contraseña válida"})
        }

        // Si llegamos hasta aquí, el usuario fue Autenticado
        // Creamos el Token
        const payload = {
            _id: foundUser._id,
            role: foundUser.role
        }

        const authToken = jwt.sign(payload,process.env.TOKEN_SECRET, {algorithm: "HS256", expiresIn: "7d"})

        res.status(200).json({authToken: authToken})
        
    } catch (error) {
        next(error)
    }

})

// Ruta GET "/api/auth/verify" => verificar la validez del Token e indicar al resto de la aplicación que el usuario fue autenticado

router.get("/verify", verifyToken, (req,res) => {

    
    res.status(200).json("Todo bien, este usuario tiene un Token válido")
})


// Ejemplo de Ruta Privada para usuarios logueados
router.get("/add-match", verifyToken, (req,res) => {
    
    // Creamos un partido
    res.status(201).json("Has creado la ficha de un partido")
})

module.exports = router
