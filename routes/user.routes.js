const express = require("express");
const router = express.Router();

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
