import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType,
      userId: user.userId,
      amount: user.amount,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, userId, userType } = req.body;

  let emailVars = email.split('@');
  if (emailVars[emailVars.length - 1] !== 'mars-techs.com') {
    res.status(400);
    throw new Error('Only authorized for Mars Telecom employees');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    userId,
    userType,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      // _id: user._id,
      firstName: firstName,
      lastName: user.lastName,
      email: user.email,
      userId: user.userId,
      amount: user.amount,
      userType: user.userType,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Register a new user by admin
// @route   POST /api/user/addUser
// @access  Admin
const addUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, userId, userType } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    userId,
    userType,
  });

  if (user) {
    res.status(201).json({ message: 'User Created Successfully!' });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType,
      amount: user.amount,
      userId: user.userId,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      email: updatedUser.email,
      userType: updateUser.userType,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const pageSize = process.env.USERS_PAGINATION_LIMIT || 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { userId: { $regex: req.query.keyword, $options: 'i' } }
    : {};
  const count = await User.countDocuments({ ...keyword });
  const users = await User.find({ ...keyword })
    .select('-password')
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.userType === 'Admin') {
      res.status(400);
      throw new Error('Can not delete admin user');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User Deleted' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.userId = req.body.userId || user.userId;
    user.userType = req.body.userType || user.userType;
    user.password = req.body.password || user.password;
    user.amount = req.body.amount || user.amount;

    await user.save();

    // res.json({
    //   _id: updatedUser._id,
    //   lastName: updatedUser.lastName,
    //   firstName: updatedUser.firstName,
    //   email: updatedUser.email,
    //   userId: updateUser.userId,
    //   userType: updatedUser.userType,
    // });
    // await User.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({ message: 'success' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const addMoney = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (req.body.amount === 0 || req.body.amount === '0') {
      user.amount = req.body.amount;
    } else {
      user.amount = req.body.amount || user.amount;
    }
    await user.save();
    res.json({ message: 'success' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
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
};
