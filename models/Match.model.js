
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const matchSchema = new Schema( 
    {
        competicion: {
            type: String,
            enum: ["Primera División", "Segunda División", "Primera RFEF", "Segunda RFEF", "Tercera RFEF", "División de Honor", "Liga Nacional", "Liga Autonómica Cadete", "Liga Autonómica Infantil", "Liga Preferente"]
        },
        fecha: {
            type: Date,
            require: [true, "Fecha es requerida"]
        },
        hora: {
            type: String,
        },
        jornada: {
            type: String,
            enum: ["Jornada 01", "Jornada 02", "Jornada 03", "Jornada 04", "Jornada 05", "Jornada 06", "Jornada 07", "Jornada 08", "Jornada 09", "Jornada 10", "Jornada 11", "Jornada 12", "Jornada 13", "Jornada 14", "Jornada 15", "Jornada 16", "Jornada 17", "Jornada 18", "Jornada 19", "Jornada 20","Jornada 21", "Jornada 22", "Jornada 23", "Jornada 24", "Jornada 25", "Jornada 26", "Jornada 27", "Jornada 28", "Jornada 29", "Jornada 30" ]
        },
        estadio: {
            type: String,
            enum: ["Martínez Valero", "Díez Iborra", "Antonio Puchades", "Manolo Maciá", "La Magdalena", "Nuevo Pepico Amat", "Mestalla", "La Rosaleda", "Metropolitano", "Riazor", "Las Gaunas", "Monumental de Maturín", "Pachencho", "Polideportivo Pueblo Nuevo", "Olímpico de la UCV", "Brígido Iriarte", "Sánchez Pizjuan", "San Mamés", "Montilivi", "El Regit", "La Murta", "Los Arcos", "San Gregorio", "Gerardo Salvador", "Vicent Morera"]
        },
        equipoRival: {
            type: String,
            require: [true, "Es necesario incluir un equipo rival"],
            enum: ["London FC", "Atlético Middleware", "Samuel Team", "Santos Kurt", "Njo Njo Team", "Racing Patata","Atlético de Patata", "Real Banana CF", "Caracas FC", "Zulia FC", "Deportivo Táchira", "Estudiantes de Mérida", "Club Azul", "Tigres de la UANL", "Querétaro FC"]
        },
        jugarComo: {
            type: String,
            enum: ["Local", "Visitante"]
        },
        entrenador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        },
        jugadores: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Usuario"
        },
        golesAnotados: {
            type: Number, 
            min: 0
        },
        golesEncajados: {
            type: Number, 
            min: 0
        },
        resultado: {
            type: String,
            enum: ["Victoria", "Empate", "Derrota"]
        },
        tarjetasAmarillas: {
            type: Number,
            min: 0
        },
        tarjetasRojas: {
            type: Number, 
            min: 0
        },
        posesionBalon: {
            type: Number,
            min: 1,
            max: 100
        },
        transicionAtaqueDefensa: {
            type: Number, 
            min: 0
        },
        transicionDefensaAtaque: {
            type: Number,
            min: 0
        },
        cornersAFavor: {
            type: Number,
            min: 0
        },
        cornersEnContra: {
            type: Number, 
            min: 0
        },
        golesBalonParado: {
            type: Number, 
            min: 0
        },
        enlacePartido: {
            type: String
        },
    }
);

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;

