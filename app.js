
import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import './src/models/asociaciones.js'; 
import userRoutes from './src/routes/user.routes.js';
import taskRoutes from './src/routes/task.routes.js';
import profileRoutes from './src/routes/profiles.routes.js';
import addressRoutes from './src/routes/addresses.routes.js';
import roleRoutes from './src/routes/roles.routes.js';
import otherRoutes from './src/routes/otros.routes.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', otherRoutes); 

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa con la DB");
    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas correctamente.");
  } catch (error) {
    console.error("No hubo conexión con la BD por:", error);
  }
})();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});