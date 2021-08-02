const { Schema, model } = require("mongoose");

const RopaSchema = Schema(
    {
        cantidad: {
            type: Number,
            required: true,
        },
        precio: {
            type: Number,
            required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
        tipo:{
            type: String,
            required: true,
            enum: ["BUZO", "REMERA", "CAMPERA", "PANTALON"],
        },
    },
    {
        timestamps: true
    }
);

module.exports = model("Ropa", RopaSchema);