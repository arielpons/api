const Usuario = require("../models/usuarios");

const getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params._id);
        if(!usuario) {
            return res.status(404).json({
                code: "NOT-FOUND",
                message: null,
                success: false,
                data: null,
                });
        };
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

const putUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOneAndUpdate({ _id: req.params._id},{...req.body }, { new: true });
        if(!usuario) {
            return res.status(404).json({
                code: "NOT-FOUND",
                message: null,
                success: false,
                data: null
            });
        };
        return res.status(200).json({
            code: "OK",
            message: null,
            success: true,
            data: usuario
        });
    }   catch(err){
        return res.status(500).json({
            code: "ERR",
            message: err.message,
            success: false,
            data: null
            });
    }
}

const deleteUsuario = async (req, res) => {
    try {
        await Usuario.deleteOne({ _id: req.params._id});
        return res.status(200).json({
            code: "OK",
            message: null,
            success: true,
            data: null
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
    getUsuario,
    putUsuario,
    deleteUsuario,
}