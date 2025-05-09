//const { Schema, model} = require("mongoose");

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        texto: {
            type: String,
            require: [true, "El comentario no puede estar vacío"]
        },
        partido: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Match"
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        visibilidad: {
            type: String,
            enum: ["Público", "Privado"]
        }
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
