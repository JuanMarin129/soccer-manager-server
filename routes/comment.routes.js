const express = require("express");
const router = express.Router();

const Comment = require('../models/Comment.model');
const Match = require("../models/Match.model");
const verifyToken = require("../middlewares/auth.middlewares");

// Crear un comentario de un partido (FUNCIONA)
router.post("/", verifyToken, async (req,res,next) => {
    try {

        // Comprobar si el usuario ya puso un comentario en este partido
        const foundComment = await Comment.findOne({partido: req.body.partido, creator: req.payload._id})

        // Si existe, no publicar el nuevo comentario
        if(foundComment) {
            res.status(400).json({errorMessage: "Ya existe un comentario de este usuario para este partido"})
            return;
        }

        // Si no existe, publicar el nuevo comentario

        const created = await Comment.create({
            texto: req.body.texto,
            partido: req.body.partido,
            creator: req.payload._id,
            visibilidad: req.body.visibilidad
        });
        res.status(201).json(created);
        
    } catch (error) {
        next(error)
    }
})

// Muestra todos los comentarios de un partido (FUNCIONA)
router.get("/for-match/:matchId", async (req,res,next) => {
    try {
        const response = await Comment.find({partido: req.params.matchId}).populate("creator", "nombre apellidos")
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
});

// Checkea si un usuario ya puso un comentario en un partido
router.get("/check-comment/:matchId", verifyToken, async (req,res,next) => {
    try {
        const response = await Comment.find({partido: req.params.matchId})
        console.log("Esta es la data desde el Back End")
        console.log(response.data)
        res.status(200).json(false)
    } catch (error) {
        next(error)
    }
});

// Muestra los datos de un comentario (necesario para editar) (FUNCIONA)
router.get("/:commentId", async (req,res,next) => {
    try {
        const response = await Comment.findById(req.params.commentId)
        res.status(200).json(response)

    } catch (error) {
        next(error)
    }

});


// Editar un comentario (FUNCIONA)
router.put("/:commentId", async (req,res,next) => {
    try {
        const created = await Comment.findByIdAndUpdate(req.params.commentId, {
            texto: req.body.texto,
            partido: req.body.partido,
            creator: req.body.creator,
            visibilidad: req.body.visibilidad
        });
        res.status(202).json(created);
        
    } catch (error) {
        next(error)
    }
})


// Eliminar el comentario de un partido (FUNCIONA)
router.delete("/:commentId", verifyToken, async (req,res,next) => {
    try {
        await Comment.findByIdAndDelete(req.params.commentId)

        res.status(202).json("El comentario fue eliminado")

    } catch (error) {
        next(error)
    }
});

// Bonus. Que sólo el usuario pueda eliminar su comentario.


module.exports = router
