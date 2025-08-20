import Profile from '../models/perfiles.model.js';
import User from '../models/user.model.js';
import Address from '../models/direcciones.model.js';

export const createProfile = async (req, res) => {
    try {
        const { bio, street, city } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'El ID de usuario es requerido.' });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const newProfile = await Profile.create({
            bio,
            userId: id,
            Address: {
                street,
                city
            }
        }, {
            include: [Address]
        });

        return res.status(201).json(newProfile);

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
                },
                {
                    model: User,
                    attributes: ['name', 'email']
                }
            ]
        });
        return res.status(200).json(profiles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los perfiles.' });
    }
};