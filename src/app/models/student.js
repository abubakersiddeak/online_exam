// models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    result: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
    },
    examId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt ও updatedAt ফিল্ড নিজে থেকেই যোগ হবে
  }
);

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
