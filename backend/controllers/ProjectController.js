import asyncHandler from '../middleware/asyncHandler.js';
import Project from '../models/ProjectModel.js';

// @desc    Create a Project
// @route   POST /api/project
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
  const { projName, projId, users } = req.body;
  const project = new Project({
    projName,
    projId,
    users,
  });

  if (project) {
    await project.save();
    res.status(201).json({ message: 'Project created successfully' });
  } else {
    res.status(409);
    throw new Error('Project creation failed');
  }
});

// @desc    Delete Project
// @route   DELETE /api/project/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await Project.deleteOne({ _id: project._id });
    res.json({ message: 'Project Deleted' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Get projects
// @route   GET /api/project
// @access  Private/Admin
const getProjects = asyncHandler(async (req, res) => {
  const pageSize = process.env.USERS_PAGINATION_LIMIT || 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { projId: { $regex: req.query.keyword, $options: 'i' } }
    : {};
  const count = await Project.countDocuments({ ...keyword });
  const projects = await Project.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ projects, page, pages: Math.ceil(count / pageSize) });
});

//@desc Get all project
//@route GET /api/project
//@access private
const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({})
    .select('-employees')
    .select('-createdAt')
    .select('-updatedAt')
    .select('-__v')
    .select('-_id');
  if (projects) {
    res.status(200).json(projects);
  } else {
    res.status(404);
    throw new Error('Projects not found');
  }
});

// @desc    Update project
// @route   PUT /api/project/:id
// @access  Private/Admin
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    project.projName = req.body.projName || project.projName;
    project.projId = req.body.projId || project.projId;

    await project.save();
    res.json({ message: 'success' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

export {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
  getProjectById,
  getAllProjects,
};
