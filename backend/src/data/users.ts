import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'admin' | 'employee';
  avatar?: string;
}

const DEMO_PASSWORD = 'OrionTek2026!';

export const users: User[] = [
  {
    id: uuid(),
    email: 'admin@oriontek.do',
    passwordHash: bcrypt.hashSync(DEMO_PASSWORD, 10),
    name: 'Administrador OrionTek',
    role: 'admin',
  },
];

export const toPublicUser = (u: User) => ({
  id: u.id,
  email: u.email,
  name: u.name,
  role: u.role,
  avatar: u.avatar,
});

export type PublicUser = ReturnType<typeof toPublicUser>;
