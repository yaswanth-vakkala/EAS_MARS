import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: ['First name field is required'] },
    lastName: { type: String, required: ['Last name field is required'] },
    email: {
      type: String,
      required: ['Email field is required'],
      unique: true,
    },
    password: { type: String, required: ['Password field is required'] },
    userId: {
      type: String,
      required: ['employee Id field is required'],
      // unique: true,
    },
    amount: {
      type: String,
      default: '0',
    },
    userType: {
      type: String,
      enum: ['Admin', 'Employee', 'HR', 'Director', 'FinanceDepartment'],
      default: 'Employee',
    },
  },
  { timestamps: true }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
