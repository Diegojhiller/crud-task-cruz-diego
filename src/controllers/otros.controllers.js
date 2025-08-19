import Profile from '../models/perfiles.model.js';
import Address from '../models/direcciones.model.js';
import Role from '../models/rol.model.js';
import User from '../models/user.model.js';


export const createProfileAndAddress = async (req, res) => {
  try {
    const { bio, street, city } = req.body;

    if (!street || !city) {
      return res.status(400).json({ message: 'La calle y la ciudad son campos obligatorios.' });
    }

    const profile = await Profile.create({ bio });
    const address = await Address.create({ street, city });
    
    await profile.setAddress(address);

    return res.status(201).json({ profile, address });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el perfil y la dirección.' });
  }
};

export const getProfilesWithAddress = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: [
        {
          model: Address,
        }
      ]
    });
    return res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los perfiles.' });
  }
};

export const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const newRole = await Role.create({ name });
    return res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el rol.' });
  }
};

export const assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.params;

    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) {
      return res.status(404).json({ message: 'Usuario o rol no encontrado.' });
    }

    await user.addRole(role);

    return res.status(200).json({ message: 'Rol asignado al usuario con éxito.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al asignar el rol.' });
  }
};

export const getUsersWithRoles = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: 'Roles', 
          through: { attributes: [] } 
        }
      ]
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los usuarios con roles.' });
  }
};
