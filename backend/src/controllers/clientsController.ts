import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { clients } from '../data/store';
import { Client, CreateClientDTO, UpdateClientDTO } from '../models/types';
import { HttpError } from '../middlewares/errorHandler';

const findById = (id: string): Client => {
  const client = clients.find((c) => c.id === id);
  if (!client) {
    throw new HttpError(404, `Cliente con id ${id} no encontrado`);
  }
  return client;
};

export const listClients = (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = (req.query.search as string)?.toLowerCase().trim() || '';
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));

    let result = clients;

    if (search) {
      result = clients.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.email.toLowerCase().includes(search) ||
          c.document.toLowerCase().includes(search)
      );
    }

    const total = result.length;
    const start = (page - 1) * limit;
    const items = result.slice(start, start + limit);

    res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

export const getClient = (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = findById(req.params.id);
    res.json(client);
  } catch (err) {
    next(err);
  }
};

export const createClient = (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body as CreateClientDTO;

    if (clients.some((c) => c.email.toLowerCase() === dto.email.toLowerCase())) {
      throw new HttpError(409, 'Ya existe un cliente con ese email');
    }

    const created: Client = {
      id: uuid(),
      name: dto.name.trim(),
      email: dto.email.trim(),
      phone: dto.phone.trim(),
      document: dto.document.trim(),
      createdAt: new Date().toISOString(),
      addresses: [],
    };

    clients.push(created);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateClient = (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = findById(req.params.id);
    const dto = req.body as UpdateClientDTO;

    if (dto.email && dto.email.toLowerCase() !== client.email.toLowerCase()) {
      const collision = clients.some(
        (c) => c.id !== client.id && c.email.toLowerCase() === dto.email!.toLowerCase()
      );
      if (collision) {
        throw new HttpError(409, 'Ya existe otro cliente con ese email');
      }
    }

    if (dto.name !== undefined) client.name = dto.name.trim();
    if (dto.email !== undefined) client.email = dto.email.trim();
    if (dto.phone !== undefined) client.phone = dto.phone.trim();
    if (dto.document !== undefined) client.document = dto.document.trim();

    res.json(client);
  } catch (err) {
    next(err);
  }
};

export const deleteClient = (req: Request, res: Response, next: NextFunction) => {
  try {
    const index = clients.findIndex((c) => c.id === req.params.id);
    if (index === -1) {
      throw new HttpError(404, `Cliente con id ${req.params.id} no encontrado`);
    }

    clients.splice(index, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
