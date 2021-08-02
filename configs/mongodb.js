const mongoose = require('mongoose');

const dbConnection = async ()=> {
    try{
        await mongoose.connect(process.env.CONEXION_DB , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("BD Conectada");
    } catch(error) {
        console.log(error);
    }
} 

module.exports = dbConnection;