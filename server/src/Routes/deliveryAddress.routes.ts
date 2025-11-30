import express from 'express';

import { AuthMiddleWare } from '../Middlewares';
import { DeliveryAddressController } from '../Controllers';

const router = express.Router();

// CREATE a new address
router.post('', AuthMiddleWare.verifyToken, DeliveryAddressController.create);

// GET all addresses for the logged-in user
router.get('', AuthMiddleWare.verifyToken, DeliveryAddressController.getAll);

// GET a single address by ID
router.get('/:id', AuthMiddleWare.verifyToken, DeliveryAddressController.getById);

// UPDATE an address by ID
router.put('/:id', AuthMiddleWare.verifyToken, DeliveryAddressController.update);

// SET an address as default
router.put('/:id/default', AuthMiddleWare.verifyToken, DeliveryAddressController.setDefault);

// SOFT DELETE an address by ID
router.delete('/:id', AuthMiddleWare.verifyToken, DeliveryAddressController.delete);

export default router;
