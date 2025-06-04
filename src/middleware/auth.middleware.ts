import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { Role } from '../models/Role';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { id: number };
      const user = await User.findByPk(decoded.id, { include: Role });

      if (!user) {
        return res.status(403).json({ message: 'Acceso denegado - Usuario no encontrado' });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }
  } else {
    return res.status(401).json({ message: 'Autenticación requerida' });
  }
};