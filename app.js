import express from "express";
import dotenv from 'dotenv' ;
import sequelize from "./src/config/database.js";
import User from './src/models/user.model.js';
import Task from './src/models/task.model.js';
import userRoutes from './src/routes/user.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(userRoutes);
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Tenemos conexión a la base de datos.');

    await sequelize.sync({ alter: true }); 
    console.log('Tablas sincronizadas correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();

app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });


   