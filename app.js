require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/usuarios.routes');
const ropaRoutes = require('./routes/ropa.routes');

const dbConnection = require("./configs/mongodb");

const app = express();

dbConnection();

app.use(express.text());
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.use('/usuarios', userRoutes);
app.use('/ropa', ropaRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
);
