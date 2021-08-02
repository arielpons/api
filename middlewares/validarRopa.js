const Joi = require('joi');

const validarIdParamRopa = async (req, res, next) => {
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

const validarPostRopa = async(req, res, next) => {
    const schema = Joi.object({
        cantidad: Joi.number().required(),
        precio: Joi.number().required(),
        descripcion: Joi.string().required(),
        tipo: Joi.string().required().valid(
            "BUZO", "REMERA", "CAMPERA", "PANTALON"
            )
         .max(1),
});

try{
    await schema.validateAsync(req.body);
    return next();   
} catch(err){
    return res.status(400).json({ mensaje: "Datos no válidos",
        })
    }
}

const validarPutRopa = async (req, res, next) => {
    const schema = Joi.object({
        cantidad: Joi.number(),
        precio: Joi.number(),
        descripcion: Joi.string(),
        tipo: Joi.string().valid("BUZO", "REMERA", "CAMPERA", "PANTALON").max(1),
    })
    try{
        await schema.validateAsync(req.body);
        return next();   
    } catch(err){
        return res.status(400).json({mensaje: "Datos no válidos",
            })
    }
}

module.exports = {
    validarIdParamRopa,
    validarPostRopa,
    validarPutRopa,
}