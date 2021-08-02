const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Usuario = require("../models/usuarios");

const validarToken = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization){
        return res.status(401).json({
            code: "AUTH-ERROR",
            message: "Token authorization must be",
            success: false,
            data: null
    });
    }
    try{
        const token = authorization.split(" ")[1];
        const { _id } = jwt.verify(token, process.env.PRIVATE_KEY);
        const usuario = await Usuario.findById({ _id });
        if(!usuario){
        return res.status(401).json({
            code: "AUTH-ERR",
            message: "Este usuario no existe",
            success: false,
            data: null
        });
        }
        req.usuario = usuario;
        return next();
    } catch(err){
        return res.status(400).json({
            code: "AUTH-ERROR",
            message: err.message,
            success: false,
            data: null
        })
    }
}

const validarTokenUsuario = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization){
        return res.status(401).json({
            code: "AUTH-ERROR",
            message: "Token authorization must be",
            success: false,
            data: null
    });
    }
    try{
        const token = authorization.split(" ")[1];
        const { _id } = jwt.verify(token, process.env.PRIVATE_KEY);
        const usuario = await Usuario.findById({ _id});
        if(!usuario){
        return res.status(401).json({
            code: "AUTH-ERR",
            message: "Este usuario no existe",
            success: false,
            data: null
        });
        }

        if(usuario._id === _id || usuario.rol === "ADMIN"){
        req.usuario = usuario;
        return next();
        } else {
            return res.status(403).json({
                code: "AUTH-ERR",
                message: "Acceso restringido",
                success: false,
                data: null
            });
        }
    } catch(err){
        return res.status(400).json({
            code: "AUTH-ERROR",
            message: err.message,
            success: false,
            data: null
        })
    }
}
const validarTokenRopa = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization){
        return res.status(401).json({
            code: "AUTH-ERROR",
            message: "Token authorization must be",
            success: false,
            data: null
    });
    }
    try{
        const token = authorization.split(" ")[1];
        const { _id } = jwt.verify(token, process.env.PRIVATE_KEY);
        const usuario = await Usuario.findById({ _id });
        if(!usuario){
        return res.status(401).json({
            code: "AUTH-ERR",
            message: "Este usuario no existe",
            success: false,
            data: null
        });
        }
        if(usuario._id === _id  || usuario.rol === 'ADMIN' || usuario.rol === 'EMPLEADO' ){
        req.usuario = usuario;
        return next();
        }else {
        return res.status(403).json({
            code: "AUTH-ERR",
            message: "Acceso restringido",
            success: false,
            data: null
        });
    }
    } catch(err){
        return res.status(400).json({
            code: "AUTH-ERROR",
            message: err.message,
            success: false,
            data: null
        })
    }
}

const validarLogin = async (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
    });
    
    try{
        await schema.validateAsync(req.body);
        return next();   
    } catch(err){
        return res.status(400).json({
            code: "VALIDATION-ERR",
            message: err.details[0].message,
            success: false,
            data: null
         })
        }
}

const validarRegistro = async(req, res, next) => {
    const schema = Joi.object({ 
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
});
try{
    await schema.validateAsync(req.body);
    return next();   
} catch(err){
    return res.status(400).json({mensaje: "Datos no válidos",
        })
    };
};

const validarRoles = (...roles) => {
    return async(req,res,next)=> {
        if(roles.includes(req.usuario.rol)){
            return next();
        }
        return res.status(403).json({
            code: "AUTH-ERR",
            message: "Acceso restringido",
            success: false,
            data: null
        });
    }       
}

module.exports = {
    validarToken,
    validarTokenUsuario,
    validarTokenRopa,
    validarLogin,
    validarRegistro,
    validarRoles
}