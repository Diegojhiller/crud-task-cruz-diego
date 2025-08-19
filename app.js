import express from 'express';
import 'dotenv';
import sequelize from './src/config/database.js';
import User from './src/models/user.model.js';
import Task from './src/models/task.model.js';
import Profile from './src/models/perfiles.model.js';
import Address from './src/models/direcciones.model.js';
import Role from './src/models/rol.model.js';
import userRoutes from './src/routes/user.routes.js';
import taskRoutes from './src/routes/task.routes.js';
import extraRoutes from './src/routes/otros.routes.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

User.hasMany(Task);
Task.belongsTo(User);

Profile.hasOne(Address, {
  foreignKey: 'addressId',
});
Address.belongsTo(Profile, {
  foreignKey: 'profileId',
});

User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api', extraRoutes); 

const main = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos.');

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al sincronizar con la base de datos:', error);
  }
};

main();