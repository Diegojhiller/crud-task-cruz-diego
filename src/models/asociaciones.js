import User from './user.model.js';
import Task from './task.model.js';
import Profile from './perfiles.model.js';
import Address from './direcciones.model.js';
import Role from './rol.model.js';


User.hasOne(Profile, { onDelete: 'CASCADE' });
Profile.belongsTo(User);

Profile.hasOne(Address, { onDelete: 'CASCADE' }); 
Address.belongsTo(Profile); 

User.hasMany(Task, { onDelete: 'CASCADE' });
Task.belongsTo(User);

User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

export { User, Task, Profile, Address, Role };