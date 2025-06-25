import { Request, Response } from 'express';
import { Patient } from '../models/Patient';
import { Op } from 'sequelize';

export class PatientController {
  async searchPatients(req: Request, res: Response) {
    try {
      const { searchTerm } = req.query;

      if (!searchTerm || typeof searchTerm !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'El término de búsqueda es requerido',
          data: [],
          total: 0
        });
      }

      // Buscar pacientes que coincidan con el nombre o DNI
      const patients = await Patient.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${searchTerm}%`
              }
            },
            {
              dni: {
                [Op.iLike]: `%${searchTerm}%`
              }
            }
          ]
        },
        attributes: ['id', 'name', 'dni', 'phone', 'email', 'birthDate'],
        order: [['name', 'ASC']],
        limit: 10 // Limitar a 10 resultados para el autocomplete
      });

      return res.status(200).json({
        success: true,
        message: 'Pacientes encontrados exitosamente',
        data: patients,
        total: patients.length
      });

    } catch (error) {
      console.error('Error al buscar pacientes:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor al buscar pacientes',
        data: [],
        total: 0
      });
    }
  }
}
