import { Request, Response } from 'express';
import { registerSchema, loginSchema } from '../dtos/auth.dto';
import { User } from '../models/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Role } from '../models/Role';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validar datos de entrada
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors: result.error.issues });
      return;
    }

    const { name, email, password, roleId } = result.data;

    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'El correo ya está registrado' });
      return;
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

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validar datos de entrada
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors: result.error.issues });
      return;
    }

    const { email, password } = result.data;

    // Buscar usuario
    const user = await User.findOne({
      where: { email },
      include: Role,
    });

    if (!user) {
      res.status(400).json({ message: 'Correo o contraseña incorrectos' });
      return;
    }

    // Validar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400).json({ message: 'Correo o contraseña incorrectos' });
      return;
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