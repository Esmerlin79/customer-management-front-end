import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { users, PublicUser, toPublicUser } from '../data/users';

import { HttpError } from './errorHandler';

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: PublicUser;
    }
  }
}

const getSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      'JWT_SECRET no está definido o es demasiado corto. Setealo en .env (mínimo 16 chars).'
    );
  }
  return secret;
};

export const signToken = (userId: string): string => {
  return jwt.sign({ sub: userId }, getSecret(), {
    expiresIn: '8h',
  });
};

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new HttpError(401, 'Token requerido'));
  }
  const token = header.slice('Bearer '.length).trim();

  try {
    const payload = jwt.verify(token, getSecret()) as JwtPayload;
    const user = users.find((u) => u.id === payload.sub);
    if (!user) {
      return next(new HttpError(401, 'Usuario no encontrado'));
    }
    req.user = toPublicUser(user);
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return next(new HttpError(401, 'Sesión expirada'));
    }
    return next(new HttpError(401, 'Token inválido'));
  }
};
