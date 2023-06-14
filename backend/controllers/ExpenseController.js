import asyncHandler from '../middleware/asyncHandler.js';
import Expense from '../models/ExpenseModel.js';

// @desc    Get expenses History list
// @route   GET /api/history
// @access  Private
const getExpenseHistory = asyncHandler(async (req, res) => {
  if (req.user.userType === 'Employee') {
    const expenses = await Expense.find({
      user: req.user._id,
      status: {
        $in: ['Reimbursed', 'Rejected'],
      },
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } else if (req.user.userType === 'HR') {
    const expenses = await Expense.find({
      currentStatus: {
        $in: [
          'EmployeeRequested',
          'HRApproved',
          'DirectorApproved',
          'FinanceDepartmentApproved',
        ],
      },
      status: { $in: ['Reimbursed', 'Rejected', 'InProcess'] },
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } else if (req.user.userType === 'Director') {
    const expenses = await Expense.find({
      currentStatus: {
        $in: ['HRApproved', 'DirectorApproved', 'FinanceDepartmentApproved'],
      },
      status: { $in: ['Reimbursed', 'Rejected', 'InProcess'] },
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } else if (req.user.userType === 'FinanceDepartment') {
    const expenses = await Expense.find({
      currentStatus: {
        $in: ['DirectorApproved', 'FinanceDepartmentApproved'],
      },
      status: { $in: ['Reimbursed', 'Rejected'] },
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } else {
    res.status(404);
    throw new Error('Expenses not found');
  }
});

// @desc    Get expenses list
// @route   GET /api/expense
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  if (req.user.userType === 'Employee') {
    const expenses = await Expense.find({
      user: req.user._id,
      status: 'InProcess',
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } else if (req.user.userType === 'HR') {
    const expenses = await Expense.find({
      currentStatus: 'EmployeeRequested',
      status: 'InProcess',
    });
    res.status(200).json(expenses);
  } else if (req.user.userType === 'Director') {
    const expenses = await Expense.find({
      currentStatus: 'HRApproved',
      status: 'InProcess',
    });
    res.status(200).json(expenses);
  } else if (req.user.userType === 'FinanceDepartment') {
    const expenses = await Expense.find({
      currentStatus: 'DirectorApproved',
      status: 'InProcess',
    });
    res.status(200).json(expenses);
  } else {
    res.status(404);
    throw new Error('Expenses not found');
  }
});

// @desc    Fetch single expense
// @route   GET /api/expense/:id
// @access  Private
const getExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (expense) {
    return res.json(expense);
  }
  res.status(404);
  throw new Error('Resource not found');
});

// @desc    Create an Expense
// @route   POST /api/expense
// @access  Private/Admin
const createExpense = asyncHandler(async (req, res) => {
  const {
    empName,
    empId,
    projName,
    projId,
    billProof,
    status,
    amount,
    description,
    date,
  } = req.body;
  const expense = new Expense({
    empName,
    empId,
    projName,
    projId,
    billProof,
    status,
    amount,
    description,
    date,
    user: req.user._id,
  });

  const createdExpense = await expense.save();
  res.status(201).json(createdExpense);
});

// @desc    Delete a product
// @route   DELETE /api/expense/:id
// @access  Private/Admin
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    await Expense.deleteOne({ _id: expense._id });
    res.json({ message: 'Expense deleted' });
  } else {
    res.status(404);
    throw new Error('Expense not found');
  }
});

// @desc    Update an Expense
// @route   PUT /api/expense/:id
// @access  Private/Admin
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    await Expense.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({ message: 'success' });
  } else {
    res.status(404);
    throw new Error('Expense not found');
  }
});

export {
  getExpenseHistory,
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
