import express from "express";
import dotenv from 'dotenv' ;
import sequelize from "./src/config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

(async () => {
    try{
        await sequelize.authenticate();
        console.log("Conexion a la base de datos establecida con Exito")
    } catch (error) {
        console.log("No se estableció la conexión con la base de datos", error);
    };
     
});

app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });