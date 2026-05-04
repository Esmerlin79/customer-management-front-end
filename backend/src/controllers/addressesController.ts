import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { clients } from '../data/store';
import { Address, CreateAddressDTO, UpdateAddressDTO } from '../models/types';
import { HttpError } from '../middlewares/errorHandler';

const findClient = (clientId: string) => {
  const client = clients.find((c) => c.id === clientId);
  if (!client) {
    throw new HttpError(404, `Cliente con id ${clientId} no encontrado`);
  }
  return client;
};

const reassignPrimary = (clientId: string, newPrimaryId: string) => {
  const client = findClient(clientId);
  client.addresses.forEach((a) => {
    a.isPrimary = a.id === newPrimaryId;
  });
};

export const listClientAddresses = (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = findClient(req.params.id);
    res.json(client.addresses);
  } catch (err) {
    next(err);
  }
};

export const createAddress = (req: Request, res: Response, next: NextFunction) => {
  try {
    const client = findClient(req.params.id);
    const dto = req.body as CreateAddressDTO;

    const created: Address = {
      id: uuid(),
      clientId: client.id,
      street: dto.street.trim(),
      city: dto.city.trim(),
      state: dto.state.trim(),
      zipCode: dto.zipCode.trim(),
      country: dto.country.trim(),
      isPrimary: client.addresses.length === 0 ? true : Boolean(dto.isPrimary),
    };

    client.addresses.push(created);

    if (created.isPrimary) {
      reassignPrimary(client.id, created.id);
    }

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const updateAddress = (req: Request, res: Response, next: NextFunction) => {
  try {
    let found: Address | undefined;
    for (const client of clients) {
      found = client.addresses.find((a) => a.id === req.params.id);
      if (found) break;
    }

    if (!found) {
      throw new HttpError(404, `Dirección con id ${req.params.id} no encontrada`);
    }

    const dto = req.body as UpdateAddressDTO;

    if (dto.street !== undefined) found.street = dto.street.trim();
    if (dto.city !== undefined) found.city = dto.city.trim();
    if (dto.state !== undefined) found.state = dto.state.trim();
    if (dto.zipCode !== undefined) found.zipCode = dto.zipCode.trim();
    if (dto.country !== undefined) found.country = dto.country.trim();

    if (dto.isPrimary === true) {
      reassignPrimary(found.clientId, found.id);
    }

    res.json(found);
  } catch (err) {
    next(err);
  }
};

export const deleteAddress = (req: Request, res: Response, next: NextFunction) => {
  try {
    for (const client of clients) {
      const index = client.addresses.findIndex((a) => a.id === req.params.id);
      if (index !== -1) {
        const wasPrimary = client.addresses[index].isPrimary;
        client.addresses.splice(index, 1);

        if (wasPrimary && client.addresses.length > 0) {
          client.addresses[0].isPrimary = true;
        }

        return res.status(204).send();
      }
    }
    throw new HttpError(404, `Dirección con id ${req.params.id} no encontrada`);
  } catch (err) {
    next(err);
  }
};
