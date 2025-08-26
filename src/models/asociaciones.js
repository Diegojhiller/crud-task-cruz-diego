import User from './user.model.js';
import Task from './task.model.js';
import Profile from './perfiles.model.js';
import Address from './direcciones.model.js';
import Role from './rol.model.js';

// Relación Uno a Uno (User - Profile)
User.hasOne(Profile, { foreignKey: 'userId', as: 'profile', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Relación Uno a Uno (Profile - Address)
Profile.hasOne(Address, { foreignKey: 'profileId', as: 'address', onDelete: 'CASCADE' });
Address.belongsTo(Profile, { foreignKey: 'profileId', as: 'profile' });

// Relación Uno a Muchos (User - Task)
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Relación Muchos a Muchos (User - Role)
User.belongsToMany(Role, { through: 'UserRoles', as: 'roles' });
Role.belongsToMany(User, { through: 'UserRoles', as: 'users' });

export { User, Task, Profile, Address, Role };
