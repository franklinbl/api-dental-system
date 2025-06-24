import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import { User } from '../models/User';

export const createAppointment = async (req: Request, res: Response) => {
  const { userId, patientId, dateTime } = req.body;

  const user = await User.findByPk(userId);
  if (!user || user.roleId !== 2) {
    return res.status(400).json({ error: 'El usuario debe ser un dentista válido' });
  }

  try {
    const appointment = await Appointment.create({
      userId,
      patientId,
      dateTime,
      status: 'pendiente'
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear la cita', details: error });
  }
};