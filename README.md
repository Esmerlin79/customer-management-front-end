# OrionTek — Panel de Gestión de Clientes

Panel para empleados de OrionTek. Permite administrar clientes y sus
direcciones (un cliente → N direcciones). Acceso protegido por login.

> **Autor:** Esmerlin Cheriel · **Fecha:** Mayo 2026

---

## Stack

**Frontend** (raíz del repo)
- React 18 · TypeScript 5 · Redux Toolkit · React Router v6
- Material UI v5 + Emotion · Tailwind CSS · SCSS
- Webpack 5 (config custom) · Axios · ESLint
- recharts (charts del dashboard)

**Backend** (`backend/`)
- Express + TypeScript
- jsonwebtoken + bcryptjs (auth)
- swagger-jsdoc + swagger-ui-express
- Storage in-memory (sin BD)

---

## Cómo correr

Requisitos: Node.js 18+ y npm 9+.

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Levanta en `http://localhost:4000`. Swagger UI en `/api-docs`.

### 2. Frontend

En otra terminal, desde la raíz del repo:

```bash
npm install
npm start
```

Abre `http://localhost:3000`.

### 3. Login

```
admin@oriontek.do
OrionTek2026!
```
