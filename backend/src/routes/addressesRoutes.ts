import { Router } from 'express';
import {
  updateAddress,
  deleteAddress,
} from '../controllers/addressesController';
import { validateAddress } from '../middlewares/validate';

const router = Router();

/**
 * @openapi
 * /api/addresses/{id}:
 *   put:
 *     summary: Actualizar dirección
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Dirección actualizada }
 *       404: { description: No existe }
 */
router.put('/:id', validateAddress, updateAddress);

/**
 * @openapi
 * /api/addresses/{id}:
 *   delete:
 *     summary: Eliminar dirección
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminada }
 */
router.delete('/:id', deleteAddress);

export default router;
