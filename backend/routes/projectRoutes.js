import express from 'express';
const router = express.Router();

import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  getProjects,
  updateProject,
} from '../controllers/ProjectController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protect, admin, createProject)
  .get(protect, admin, getProjects);
router.route('/projects').get(protect, getAllProjects);
router
  .route('/:id')
  .get(protect, admin, getProjectById)
  .delete(protect, admin, deleteProject)
  .patch(protect, admin, updateProject);

export default router;
