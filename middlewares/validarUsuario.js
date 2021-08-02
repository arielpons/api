const Joi = require('joi');

const validarIdParamUsuario = async (req, res, next) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
    }).required();

    try{
        await schema.validateAsync(req.params);
        return next();
    } catch(err){
        return res.status(400).json({mensaje: "Datos no válidos",
        })
    }
}



const validarPutUsuario = async (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        rol: Joi.string().valid('ADMIN', 'EMPLEADO', 'USUARIO'),
    })

    try{
        await schema.validateAsync(req.body);
        return next();   
    } catch(err){
        return res.status(400).json({
            mensaje: "Datos no válidos",
            })
    }
}

module.exports = {
    validarIdParamUsuario,
    validarPutUsuario,
}