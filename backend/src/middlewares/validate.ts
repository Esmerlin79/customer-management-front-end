import { Request, Response, NextFunction } from 'express';
import { HttpError } from './errorHandler';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateClient = (req: Request, _res: Response, next: NextFunction) => {
  const { name, email, phone, document } = req.body ?? {};
  const errors: string[] = [];

  const isCreate = req.method === 'POST';

  if (isCreate || name !== undefined) {
    if (typeof name !== 'string' || name.trim().length < 2) {
      errors.push('name debe tener al menos 2 caracteres');
    }
  }

  if (isCreate || email !== undefined) {
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      errors.push('email inválido');
    }
  }

  if (isCreate || phone !== undefined) {
    if (typeof phone !== 'string' || phone.trim().length < 6) {
      errors.push('phone inválido');
    }
  }

  if (isCreate || document !== undefined) {
    if (typeof document !== 'string' || document.trim().length < 3) {
      errors.push('document inválido');
    }
  }

  if (errors.length > 0) {
    return next(new HttpError(400, errors.join('; ')));
  }

  next();
};

export const validateAddress = (req: Request, _res: Response, next: NextFunction) => {
  const { street, city, state, zipCode, country } = req.body ?? {};
  const errors: string[] = [];
  const isCreate = req.method === 'POST';

  const requireString = (field: string, value: unknown, min = 2) => {
    if (typeof value !== 'string' || value.trim().length < min) {
      errors.push(`${field} es requerido (mínimo ${min} caracteres)`);
    }
  };

  if (isCreate || street !== undefined) requireString('street', street);
  if (isCreate || city !== undefined) requireString('city', city);
  if (isCreate || state !== undefined) requireString('state', state);
  if (isCreate || zipCode !== undefined) requireString('zipCode', zipCode, 1);
  if (isCreate || country !== undefined) requireString('country', country);

  if (errors.length > 0) {
    return next(new HttpError(400, errors.join('; ')));
  }

  next();
};
