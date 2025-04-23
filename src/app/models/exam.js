import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [
          {
            optionText: { type: String, required: true },
            isCorrect: { type: Boolean, required: true },
          },
          {
            optionText: { type: String, required: true },
            isCorrect: { type: Boolean, required: true },
          },
          {
            optionText: { type: String, required: true },
            isCorrect: { type: Boolean, required: true },
          },
          {
            optionText: { type: String, required: true },
            isCorrect: { type: Boolean, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true } // This will automatically add `createdAt` and `updatedAt` fields
);

const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);

export default Exam;
