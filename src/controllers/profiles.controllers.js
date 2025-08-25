import Profile from '../models/perfiles.model.js';
import User from '../models/user.model.js';
import Address from '../models/direcciones.model.js';


export const createProfileAndAddress = async (req, res) => {
  try {
    const { bio, street, city } = req.body;
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const newProfile = await Profile.create({
      bio,
      userId: userId,
      Address: {
        street,
        city
      }
    }, {
      include: [Address]
    });

    res.status(201).json({ message: 'Perfil y dirección creados', profile: newProfile });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el perfil y la dirección.' });
  }
};


export const getAllProfilesWithDetails = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: [
        { model: User, as: 'user', attributes: ['name', 'email'] },
        { model: Address, as: 'address' }
      ]
    });
    res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los perfiles.' });
  }
};


export const getProfileWithDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['name', 'email'] },
        { model: Address, as: 'address' }
      ]
    });
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el perfil.' });
  }
};


export const updateProfileAndAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { bio, street, city } = req.body;
    
    const profile = await Profile.findByPk(id, { include: [Address] });
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }

    await profile.update({ bio });


    if (profile.address) {
      await profile.address.update({ street, city });
    }

    res.status(200).json({ message: 'Perfil y dirección actualizados.', profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el perfil y la dirección.' });
  }
};

export const deleteProfileAndAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }
    await profile.destroy(); 
    res.status(200).json({ message: 'Perfil y dirección eliminados.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el perfil.' });
  }
};