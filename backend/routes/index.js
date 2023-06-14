import { Router } from 'express';
import expenseRoutes from './expenseRoutes.js';
import userRoutes from './userRoutes.js';
import uploadRoutes from './uploadRoutes.js'

const router = Router();

router.use('/expense', expenseRoutes);
router.use('/user', userRoutes);
router.use('/upload', uploadRoutes);

export default router;
