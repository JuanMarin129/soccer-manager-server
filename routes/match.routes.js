const express = require("express");
const router = express.Router();

const Match = require(`../models/Match.model`);

// Crear Ficha Partido (FUNCIONA)
router.post("/", async (req, res, next) => {
    try {
        const created = await Match.create({
            competicion: req.body.competicion,
            fecha: req.body.fecha,
            hora: req.body.hora,
            jornada: req.body.jornada,
            estadio: req.body.estadio,
            equipoRival: req.body.equipoRival,
            jugarComo: req.body.jugarComo,
            entrenador: req.body.entrenador,
            jugadores: req.body.jugadores,
            golesAnotados: req.body.golesAnotados,
            golesEncajados: req.body.golesEncajados,
            resultado: req.body.resultado,
            tarjetasAmarillas: req.body.tarjetasAmarillas,
            tarjetasRojas: req.body.tarjetasRojas,
            posesionBalon: req.body.posesionBalon,
            transicionAtaqueDefensa: req.body.transicionAtaqueDefensa,
            transicionDefensaAtaque: req.body.transicionDefensaAtaque,
            cornersAFavor: req.body.cornersAFavor,
            cornersEnContra: req.body.cornersEnContra,
            golesBalonParado: req.body.golesBalonParado,
            enlacePartido: req.body.enlacePartido
        });
        res.status(201).json(created);
        
    } catch (error) {
        next(error)
    }
});

// Recuperar todos los partidos (FUNCIONA)
router.get("/", async (req,res,next) => {
    try {
        const response = await Match.find()
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
});

module.exports = router;
