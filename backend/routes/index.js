import { Router } from 'express';
import expenseRoutes from './expenseRoutes.js';
import userRoutes from './userRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import projectRoutes from './projectRoutes.js';

const router = Router();

router.use('/expense', expenseRoutes);
router.use('/user', userRoutes);
router.use('/project', projectRoutes);
router.use('/upload', uploadRoutes);

export default router;
