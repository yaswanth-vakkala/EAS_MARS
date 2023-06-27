import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addUser,
  addMoney,
} from '../controllers/UserController.js';
import {
  protect,
  admin,
  FinanceDepartmentOrAdmin,
  FinanceDepartmentOrAdminOrDirector,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(registerUser)
  .get(protect, FinanceDepartmentOrAdmin, getUsers);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile);
// .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, FinanceDepartmentOrAdminOrDirector, getUserById)
  .patch(protect, admin, updateUser);
router.route('/addUser').post(protect, admin, addUser);
router
  .route('/:id/addMoney')
  .patch(protect, FinanceDepartmentOrAdminOrDirector, addMoney);

export default router;
