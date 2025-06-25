import { Request, Response } from 'express';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { Op } from 'sequelize';

export class UserController {
  // Buscar dentistas por nombre o DNI
  async searchDentists(req: Request, res: Response) {
    try {
      const { searchTerm } = req.query;

      if (!searchTerm || typeof searchTerm !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'El término de búsqueda es requerido'
        });
      }

      // Buscar el rol de dentista
      const dentistRole = await Role.findOne({
        where: {
          name: 'dentist'
        }
      });

      if (!dentistRole) {
        return res.status(404).json({
          success: false,
          message: 'Rol de dentista no encontrado'
        });
      }

      // Buscar usuarios que sean dentistas y coincidan con el término de búsqueda
      const dentists = await User.findAll({
        where: {
          roleId: dentistRole.id,
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${searchTerm}%` // Búsqueda case-insensitive por nombre
              }
            },
            {
              dni: {
                [Op.iLike]: `%${searchTerm}%` // Búsqueda case-insensitive por DNI
              }
            }
          ]
        },
        include: [
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'name']
          }
        ],
        attributes: [
          'id',
          'name',
          'email',
          'dni',
          'phone',
          'isActive',
          'roleId',
          'createdAt',
          'updatedAt'
        ],
        order: [['name', 'ASC']], // Ordenar por nombre ascendente
        limit: 20 // Limitar resultados para evitar sobrecarga
      });

      console.log(dentists);

      return res.status(200).json({
        success: true,
        data: dentists,
        total: dentists.length,
        message: 'Dentistas encontrados exitosamente'
      });

    } catch (error) {
      console.error('Error al buscar dentistas:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor al buscar dentistas',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
}
