const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require('../models/User.model')

// Mostrar todos los jugadores
router.get("/players", async (req,res,next) => {
    try {

       const response = await User.find({role: "jugador"})
       res.status(200).json(response)
        
    } catch (error) {
        next(error)
    }
})


// Mostrar ficha de un usuario

router.get("/profile/:userId", async (req,res,next) => {
    try {

        const response = await User.findById(req.params.userId)
        res.status(200).json(response)
        
    } catch (error) {
        next(error)
    }
})


// Editar ficha de un usuario

router.put("/profile/:userId", async (req,res,next) => {
  
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
        /*
        const foundUser = await User.findOne({email: email})
        if(foundUser !== null) {
            res.status(400).json({errorMessage: "Ya existe un usuario con ese email"})
            return;
        }*/

        // Aquí empezamos a crear el usuario tras comprobar que todos los datos son correctos
        //const hashPassword = await bcrypt.hash(password, 12)

        const response = await User.findByIdAndUpdate(req.params.userId, {
            nombre: nombre,
            apellidos: apellidos,
            password: hashPassword,
            email: email,
            role: req.body.role,
            fechaNacimiento: req.body.fechaNacimiento,
            PaisNacionalidad: req.body.PaisNacionalidad,
            foto: req.body.foto,
            telefono: req.body.telefono,
            equipo: req.body.equipo
        })

        res.status(202).json(response)
        
    } catch (error) {
        next(error)
    }

})

/*
router.get("/profile", async (req,res,next) => {
    
    try {

        const response = await User.find()
        res.status(200).json(response)
        
    } catch (error) {
        next(error)
    }
    
});

*/


module.exports = router;
