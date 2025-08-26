import User from './user.model.js';
import Task from './task.model.js';
import Profile from './perfiles.model.js';
import Address from './direcciones.model.js';
import Role from './rol.model.js';

// Relación Uno a Uno (User - Profile)
User.hasOne(Profile, { onDelete: 'CASCADE' });
Profile.belongsTo(User);

// Relación Uno a Uno (Profile - Address)
// Agrega esta línea para que la creación anidada funcione
Profile.hasOne(Address, { onDelete: 'CASCADE' }); 
Address.belongsTo(Profile); // Aquí no necesitas foreignKey porque la clave ya se manejará con la asociación

// Relación Uno a Muchos (User - Task)
User.hasMany(Task, { onDelete: 'CASCADE' });
Task.belongsTo(User);

// Relación Muchos a Muchos (User - Role)
User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

export { User, Task, Profile, Address, Role };
