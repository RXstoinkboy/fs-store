import express from 'express';
import * as controller from './controller.js';
import { requestValidation } from '../../middleware/request-validation.js';
import { ProductsQuerySchema } from './schemas.js';

const router = express.Router();

router.route('/').get([requestValidation(ProductsQuerySchema), controller.getProducts]);

export default router