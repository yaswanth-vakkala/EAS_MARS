import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    projName: { type: String, required: ['Project name is required'] },
    projId: {
      type: String,
      required: ['Project ID is required'],
      unique: true,
    },
    employees: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
