import Address from '../models/direcciones.model.js';
import Profile from '../models/perfiles.model.js';

export const createAddress = async (req, res) => {
    try {
        const { street, city, profileId } = req.body;

        if (!profileId) {
            return res.status(400).json({ message: 'El ID de perfil es requerido para la dirección.' });
        }

        const newAddress = await Address.create({ street, city, profileId });
        return res.status(201).json(newAddress);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear la dirección.' });
    }
};

export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.findAll({
            include: [{ model: Profile }]
        });
        return res.status(200).json(addresses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las direcciones.' });
    }
};