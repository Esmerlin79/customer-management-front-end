import { Router } from 'express';
import {
  listClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/clientsController';
import {
  listClientAddresses,
  createAddress,
} from '../controllers/addressesController';
import { validateClient, validateAddress } from '../middlewares/validate';

const router = Router();

/**
 * @openapi
 * /api/clients:
 *   get:
 *     summary: Listar clientes con búsqueda y paginación
 *     tags: [Clients]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Texto a buscar en name, email o document
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Lista paginada de clientes
 */
router.get('/', listClients);

/**
 * @openapi
 * /api/clients/{id}:
 *   get:
 *     summary: Obtener un cliente por ID (incluye sus direcciones)
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Cliente encontrado }
 *       404: { description: No existe }
 */
router.get('/:id', getClient);

/**
 * @openapi
 * /api/clients:
 *   post:
 *     summary: Crear cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClientDTO'
 *     responses:
 *       201: { description: Cliente creado }
 *       400: { description: Datos inválidos }
 *       409: { description: Email duplicado }
 */
router.post('/', validateClient, createClient);

/**
 * @openapi
 * /api/clients/{id}:
 *   put:
 *     summary: Actualizar cliente
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClientDTO'
 *     responses:
 *       200: { description: Cliente actualizado }
 *       404: { description: No existe }
 */
router.put('/:id', validateClient, updateClient);

/**
 * @openapi
 * /api/clients/{id}:
 *   delete:
 *     summary: Eliminar cliente y sus direcciones
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No existe }
 */
router.delete('/:id', deleteClient);

/**
 * @openapi
 * /api/clients/{id}/addresses:
 *   get:
 *     summary: Listar direcciones de un cliente
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Lista de direcciones }
 */
router.get('/:id/addresses', listClientAddresses);

/**
 * @openapi
 * /api/clients/{id}/addresses:
 *   post:
 *     summary: Agregar dirección a un cliente
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAddressDTO'
 *     responses:
 *       201: { description: Dirección creada }
 */
router.post('/:id/addresses', validateAddress, createAddress);

export default router;
