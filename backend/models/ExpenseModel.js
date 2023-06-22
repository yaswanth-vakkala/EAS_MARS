import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    empName: { type: String, required: ['Employee name is required'] },
    empId: { type: String, required: ['Employee ID is required'] },
    projName: { type: String, required: ['Project name is required'] },
    projId: { type: String, required: ['Project ID is required'] },
    billProof: {
      type: String,
      default: 'Resource Link',
      required: ['Bill Proof is required'],
    },
    status: {
      type: String,
      enum: ['InProcess', 'Reimbursed', 'Rejected'],
      default: 'InProcess',
    },
    amount: { type: Number, required: ['Expense Amount is required'] },
    description: {
      type: String,
      required: ['Expense Description is required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    currentStatus: {
      type: String,
      enum: [
        'EmployeeRequested',
        'HRApproved',
        'DirectorApproved',
        'FinanceDepartmentApproved',
      ],
      default: 'EmployeeRequested',
    },
    date: { type: Date, default: new Date() },
    rejectionReason: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
