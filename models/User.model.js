// ❗This is an example of a User Model. 
// TODO: Please make sure you edit the User model to whatever makes sense in your project.

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    nombre: {
        type: String,
        require: [true, "Nombre es requerido"]
    },
    apellidos: {
        type: String,
        require: [true, "Apellidos es requerido"]
    },
    password: {
        type: String,
        require: [true, "Password es requerido"]
    },
    email: {
        type: String,
        require: [true, "Email es requerido"],
        unique: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ["jugador", "entrenador", "director deportivo"],
        default: "jugador"
    },
    fechaNacimiento: {
        type: Date
    },
    PaisNacionalidad: {
        type: String,
        enum: ["España", "Portugal", "Francia", "Italia", "Suiza", "Inglaterra","Escocia", "Gales", "Irlanda del Norte", "Suecia", "Noruega", "Polonia", "Rumania", "Rusia","Turquía", "Venezuela", "Ecuador", "Perú", "Argentina", "Brasil", "Chile", "México", "Canadá", "EEUU" ]
    },
    foto: {
        type: String
    },
    telefono: {
        type: String
    },
    equipo: {
        type: String,
        enum: ["Primer Equipo", "Equipo Filial", "Juvenil A", "Juvenil B", "Cadete A", "Cadete B", "Infantil A", "Infantil B"]
    }
  }
);

const User = model("User", userSchema);

module.exports = User;
