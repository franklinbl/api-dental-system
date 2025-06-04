import { Request, Response } from 'express';
import { User } from '../models/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Role } from '../models/Role';

// Registro de usuario
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roleId } = req.body;

    // Validar campos requeridos
    if (!name || !email || !password || !roleId) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId,
    });

    res.status(201).json({ message: 'Usuario creado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

// Inicio de sesión
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({
      where: { email },
      include: Role, // Asegúrate de incluir el rol
    });

    if (!user) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Validar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, roleId: user.roleId, role: user.role?.name },
      process.env.JWT_SECRET || 'mysecretpassword',
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};