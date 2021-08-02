const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuarios");
const bcryptjs = require("bcryptjs");

const login = async (req, res) => {
    const { email, password } = req.body;
   
    try {
        const usuario = await Usuario.findOne({email});
        if(!usuario || !bcryptjs.compareSync(password, usuario.password)){
        return res.status(400).json({
            code: "AUTH-ERR",
            message: "Email y/o contraseña inválidos",
            success: false,
            data: null
        });
        }
    const token = jwt.sign({_id: usuario._id}, process.env.PRIVATE_KEY, { expiresIn: "1h"});

        return res.status(200).json({
            code: "OK",
            message: null,
            success: true,
            data: {
                usuario,
                token
            }
            });
    } catch (err) {
        return res.status(400).json({
            code: "VALIDATION-ERR",
            message: err.message,
            success: false,
            data: null
            });
    }
}

const register = async (req, res) => {
    const {password , ...resto} = req.body;
    resto.password = bcryptjs.hashSync(password, 10);
    try {
        const usuario = await Usuario.create(resto);
        return res.status(200).json({
            code: "OK",
            message: null,
            success: true,
            data: usuario
        });
    } catch(err){
        return res.status(500).json({
            code: "ERR",
            message: err.message,
            success: false,
            data: null
            });
    }
}

module.exports = { 
   login,
   register
}