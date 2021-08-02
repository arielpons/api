const Ropa = require("../models/Ropa");

const getAllRopa = async (req, res) => {
    const page = Number (req.query.page);
    const limit = Number (req.query.limit);
    const skipIndex = (page - 1) * limit;
    try {
        const contador = await Ropa.countDocuments();
        const resultado = await Ropa.find()
        .sort({ _id: 1})
        .limit(limit)
        .skip(skipIndex);
        return res.status(200).json({
            code: "OK",
            message: null,
            success: true,
            data: {
                contador,
                resultado
            }
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

const postRopa = async (req, res) => {
    try {
        const ropa = await Ropa.create(req.body);
        return res.status(200).json({
            code: "OK",
            message: null,
            success: true,
            data: ropa
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

const putRopa = async (req, res) => {
    try {
        const ropa = await Ropa.findOneAndUpdate({ _id: req.params._id},{...req.body }, { new: true });
        if(!ropa) {
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
            data: ropa
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

const deleteRopa = async (req, res) => {
    try {
        await Ropa.deleteOne({ _id: req.params._id});
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
    getAllRopa,
    postRopa,
    putRopa,
    deleteRopa,
}
