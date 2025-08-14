import express from 'express';
import 'dotenv/config';
import sequelize from './src/config/database.js';
import User from './src/models/user.model.js';
import Task from './src/models/task.model.js';
import userRoutes from './src/routes/user.routes.js';
import taskRoutes from './src/routes/task.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const main = async () => {
  try {
    console.log(`Cargando modelos: ${User.name} y ${Task.name}`);
    await sequelize.sync({ alter: true });
    console.log('Models synchronized with the database.');

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};

main();