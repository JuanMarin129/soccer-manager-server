

const { Schema, model} = require("mongoose");

const commentSchema = new Schema(
    {
        texto: {
            type: String,
            require: [true, "El comentario no puede estar vacío"]
        },
        partido: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Partido"
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
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

const Comment = model("Comment", commentSchema);

module.exports = Comment;
