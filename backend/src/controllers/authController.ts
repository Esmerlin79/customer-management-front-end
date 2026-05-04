import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

import { users, toPublicUser } from '../data/users';
import { HttpError } from '../middlewares/errorHandler';
import { signToken } from '../middlewares/auth';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body ?? {};

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new HttpError(400, 'email y password son requeridos');
    }

    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    // Compare dummy si no existe el user para igualar timing.
    const hashToCompare =
      user?.passwordHash ??
      '$2a$10$invalidhashinvalidhashinvalidhashinvalidhashinvalidhashinva';

    const ok = await bcrypt.compare(password, hashToCompare);

    if (!user || !ok) {
      throw new HttpError(401, 'Credenciales inválidas');
    }

    const token = signToken(user.id);

    res.json({
      user: toPublicUser(user),
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const me = (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'No autenticado' });
    return;
  }
  res.json({ user: req.user });
};
