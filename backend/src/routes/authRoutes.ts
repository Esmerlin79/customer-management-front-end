import { Router } from 'express';

import { login, me } from '../controllers/authController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: 'admin@oriontek.do' }
 *               password: { type: string, example: 'OrionTek2026!' }
 *     responses:
 *       200:
 *         description: Login exitoso (devuelve user + token JWT)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user: { $ref: '#/components/schemas/PublicUser' }
 *                 token: { type: string }
 *       401: { description: Credenciales inválidas }
 */
router.post('/login', login);

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     summary: Obtener el usuario autenticado actual
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: Usuario actual }
 *       401: { description: Token inválido o ausente }
 */
router.get('/me', requireAuth, me);

export default router;
