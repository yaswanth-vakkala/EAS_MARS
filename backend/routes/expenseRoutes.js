import express from 'express';
const router = express.Router();
import {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  getExpenseHistory,
  getReport,
  getProjectReport,
} from '../controllers/ExpenseController.js';
import { protect, userWithAccess } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getExpenses).post(protect, createExpense);
router.route('/history').get(protect, getExpenseHistory);
router.route('/report').post(protect, userWithAccess, getReport);
router.route('/projectReport').post(protect, userWithAccess, getProjectReport);

router
  .route('/:id')
  .delete(protect, deleteExpense)
  .patch(protect, userWithAccess, updateExpense)
  .get(protect, userWithAccess, getExpenseById);

export default router;
