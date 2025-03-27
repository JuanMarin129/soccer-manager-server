const router = require("express").Router();
const User = require("../models/User.model")


// Las rutas del auth


// Ruta POST "/api/auth/signup" => crear documento de usuario 
router.post("/signup", async(req, res) => {
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
        
        /*
        await User.create({
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            password: req.body.password,
            email: req.body.email
        })
            */

        res.status(201).json("Usuario creado con éxito")
        
    } catch (error) {
        console.log(error)
    }

})

// Ruta POST "/api/auth/login" => validar credenciales del usuario y crear un Token

// Ruta GET "/api/auth/verify" => verificar la validez del Token e indicar al resto de la aplicación que el usuario fue autenticado



module.exports = router
