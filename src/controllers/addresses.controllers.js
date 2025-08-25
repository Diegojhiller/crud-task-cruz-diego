import Address from '../models/direcciones.model.js';
import Profile from '../models/perfiles.model.js';
import User from '../models/user.model.js';


export const createAddress = async (req, res) => {
  try {
    const { street, city } = req.body;
    const { profileId } = req.params;

    const profile = await Profile.findByPk(profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado.' });
    }

    const newAddress = await Address.create({
      street,
      city,
      idProfile: profileId
    });

    res.status(201).json({ message: 'Dirección creada y asociada al perfil.', address: newAddress });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la dirección.' });
  }
};

export const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      include: [
        { 
          model: Profile, 
          as: 'idProfile', 
          include: [{ model: User, as: 'user', attributes: ['name', 'email'] }] 
        }
      ]
    });
    res.status(200).json(addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las direcciones.' });
  }
};

export const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findByPk(id, {
      include: [
        { 
          model: Profile, 
          as: 'idProfile',
          include: [{ model: User, as: 'user', attributes: ['name', 'email'] }] 
        }
      ]
    });
    if (!address) {
      return res.status(404).json({ message: 'Dirección no encontrada.' });
    }
    res.status(200).json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la dirección.' });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { street, city } = req.body;

    const address = await Address.findByPk(id);
    if (!address) {
      return res.status(404).json({ message: 'Dirección no encontrada.' });
    }

    await address.update({ street, city });
    res.status(200).json({ message: 'Dirección actualizada.', address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la dirección.' });
  }
};


export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findByPk(id);
    if (!address) {
      return res.status(404).json({ message: 'Dirección no encontrada.' });
    }
    await address.destroy();
    res.status(200).json({ message: 'Dirección eliminada.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la dirección.' });
  }
};