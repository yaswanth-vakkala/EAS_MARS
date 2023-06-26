import asyncHandler from '../middleware/asyncHandler.js';
import Expense from '../models/ExpenseModel.js';

// @desc    Get expenses History list
// @route   GET /api/history
// @access  Private
const getExpenseHistory = asyncHandler(async (req, res) => {
  const pageSize = process.env.EXPENSES_HISTORY_PAGINATION_LIMIT || 12;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { description: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  if (req.user.userType === 'Employee') {
    let count = await Expense.find({
      user: req.user._id,
      status: {
        $in: ['Reimbursed', 'Rejected'],
      },
      ...keyword,
    });
    count = count.length;
    const expenses = await Expense.find({
      user: req.user._id,
      status: {
        $in: ['Reimbursed', 'Rejected'],
      },
      ...keyword,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .sort({
        createdAt: -1,
      });
    res
      .status(200)
      .json({ expenses, page, pages: Math.ceil(count / pageSize) });
  } else if (req.user.userType === 'HR') {
    let keyword = req.query.keyword
      ? { empId: { $regex: req.query.keyword, $options: 'i' } }
      : {};
    let count = await Expense.find({
      $or: [
        { currentStatus: 'EmployeeRequested', status: 'Rejected' },
        {
          currentStatus: 'HRApproved',
          status: { $in: ['Rejected', 'InProcess'] },
        },
        {
          currentStatus: 'DirectorApproved',
          status: { $in: ['Rejected', 'InProcess'] },
        },
        { currentStatus: 'FinanceDepartmentApproved', status: 'Reimbursed' },
      ],
      ...keyword,
    });
    count = count.length;
    const expenses = await Expense.find({
      $or: [
        { currentStatus: 'EmployeeRequested', status: 'Rejected' },
        {
          currentStatus: 'HRApproved',
          status: { $in: ['Rejected', 'InProcess'] },
        },
        {
          currentStatus: 'DirectorApproved',
          status: { $in: ['Rejected', 'InProcess'] },
        },
        { currentStatus: 'FinanceDepartmentApproved', status: 'Reimbursed' },
      ],
      ...keyword,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .sort({
        createdAt: -1,
      });
    res
      .status(200)
      .json({ expenses, page, pages: Math.ceil(count / pageSize) });
  } else if (req.user.userType === 'Director') {
    const keyword = req.query.keyword
      ? { empId: { $regex: req.query.keyword, $options: 'i' } }
      : {};
    let count = await Expense.find({
      $or: [
        {
          currentStatus: 'HRApproved',
          status: { $in: ['Rejected'] },
        },
        {
          currentStatus: 'DirectorApproved',
          status: { $in: ['Rejected', 'InProcess'] },
        },
        { currentStatus: 'FinanceDepartmentApproved', status: 'Reimbursed' },
      ],
      ...keyword,
    });
    count = count.length;
    const expenses = await Expense.find({
      $or: [
        {
          currentStatus: 'HRApproved',
          status: { $in: ['Rejected'] },
        },
        {
          currentStatus: 'DirectorApproved',
          status: { $in: ['Rejected', 'InProcess'] },
        },
        { currentStatus: 'FinanceDepartmentApproved', status: 'Reimbursed' },
      ],
      ...keyword,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .sort({
        createdAt: -1,
      });
    res
      .status(200)
      .json({ expenses, page, pages: Math.ceil(count / pageSize) });
  } else if (req.user.userType === 'FinanceDepartment') {
    const keyword = req.query.keyword
      ? { empId: { $regex: req.query.keyword, $options: 'i' } }
      : {};
    let count = await Expense.find({
      currentStatus: {
        $in: ['DirectorApproved', 'FinanceDepartmentApproved'],
      },
      status: { $in: ['Reimbursed', 'Rejected'] },
      ...keyword,
    });
    count = count.length;
    const expenses = await Expense.find({
      currentStatus: {
        $in: ['DirectorApproved', 'FinanceDepartmentApproved'],
      },
      status: { $in: ['Reimbursed', 'Rejected'] },
      ...keyword,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .sort({
        createdAt: -1,
      });
    res
      .status(200)
      .json({ expenses, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(404);
    throw new Error('Expenses not found');
  }
});

// @desc    Get expenses list
// @route   GET /api/expense
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  const pageSize = process.env.EXPENSES_PAGINATION_LIMIT || 12;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { description: { $regex: req.query.keyword, $options: 'i' } }
    : {};
  if (req.user.userType === 'Employee') {
    let count = await Expense.find({
      user: req.user._id,
      status: 'InProcess',
      ...keyword,
    });
    count = count.length;
    const expenses = await Expense.find({
      user: req.user._id,
      status: 'InProcess',
      ...keyword,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .sort({
        createdAt: -1,
      });
    res
      .status(200)
      .json({ expenses, page, pages: Math.ceil(count / pageSize) });
  } else if (req.user.userType === 'HR') {
    const keyword = req.query.keyword
      ? { empId: { $regex: req.query.keyword, $options: 'i' } }
      : {};
    let count = await Expense.find({
      currentStatus: 'EmployeeRequested',
      status: 'InProcess',
      ...keyword,
    });
    count = count.length;
    const expenses = await Expense.find({
      currentStatus: 'EmployeeRequested',
      status: 'InProcess',
      ...keyword,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res
      .status(200)
      .json({ expenses, page, pages: Math.ceil(count / pageSize) });
  } else if (req.user.userType === 'Director') {
    const keyword = req.query.keyword
      ? { empId: { $regex: req.query.keyword, $options: 'i' } }
      : {};
    let count = await Expense.find({
      currentStatus: 'HRApproved',
      status: 'InProcess',
      ...keyword,
    });
    count = count.length;
    const expenses = await Expense.find({
      currentStatus: 'HRApproved',
      status: 'InProcess',
      ...keyword,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res
      .status(200)
      .json({ expenses, page, pages: Math.ceil(count / pageSize) });
  } else if (req.user.userType === 'FinanceDepartment') {
    const keyword = req.query.keyword
      ? { empId: { $regex: req.query.keyword, $options: 'i' } }
      : {};
    let count = await Expense.find({
      currentStatus: 'DirectorApproved',
      status: 'InProcess',
      ...keyword,
    });
    count = count.length;
    const expenses = await Expense.find({
      currentStatus: 'DirectorApproved',
      status: 'InProcess',
      ...keyword,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res
      .status(200)
      .json({ expenses, page, pages: Math.ceil(count / pageSize) });
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
