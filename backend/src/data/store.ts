import { v4 as uuid } from 'uuid';
import { Client } from '../models/types';

const now = () => new Date().toISOString();

const client1Id = uuid();
const client2Id = uuid();
const client3Id = uuid();

export const clients: Client[] = [
  {
    id: client1Id,
    name: 'Acme Corporation',
    email: 'contacto@acme.com',
    phone: '+1 809-555-0101',
    document: '1-30-12345-6',
    createdAt: now(),
    addresses: [
      {
        id: uuid(),
        clientId: client1Id,
        street: 'Av. Winston Churchill 1099',
        city: 'Santo Domingo',
        state: 'Distrito Nacional',
        zipCode: '10148',
        country: 'República Dominicana',
        isPrimary: true,
      },
      {
        id: uuid(),
        clientId: client1Id,
        street: 'Calle El Sol 56',
        city: 'Santiago',
        state: 'Santiago',
        zipCode: '51000',
        country: 'República Dominicana',
        isPrimary: false,
      },
    ],
  },
  {
    id: client2Id,
    name: 'TechSolutions SRL',
    email: 'info@techsolutions.do',
    phone: '+1 809-555-0202',
    document: '1-31-98765-4',
    createdAt: now(),
    addresses: [
      {
        id: uuid(),
        clientId: client2Id,
        street: 'Av. 27 de Febrero 234',
        city: 'Santo Domingo',
        state: 'Distrito Nacional',
        zipCode: '10110',
        country: 'República Dominicana',
        isPrimary: true,
      },
    ],
  },
  {
    id: client3Id,
    name: 'Global Trade Inc',
    email: 'sales@globaltrade.com',
    phone: '+1 829-555-0303',
    document: '4-01-55555-1',
    createdAt: now(),
    addresses: [],
  },
];
