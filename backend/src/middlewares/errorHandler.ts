import { Request, Response, NextFunction } from 'express';

export class HttpError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  console.error('[ERROR INESPERADO]', err);
  res.status(500).json({ error: 'Error interno del servidor' });
};

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Recurso no encontrado' });
};
