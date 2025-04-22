import connectDB, { connectMongodb } from "../lib/mongodb";
import exam from "../models/exam";

export const dynamic = "force-dynamic"; // ডাটা ফ্রেশ রাখতে

export default async function Exams() {
  await connectMongodb();
  const exams = await exam.find();

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-12 max-w-7xl mx-auto ">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-blue-700">
        📚 সব পরীক্ষা
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {exams.map((exam) => (
          <div
            key={exam._id}
            className="w-full sm:w-[300px] md:w-[300px] lg:w-[300px] xl:w-[350px] rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 p-5 border border-gray-100 hover:border-blue-300 transform hover:scale-105"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              {exam.title}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-3">
              {exam.description}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
              <span>⏱️ সময়: {exam.duration} মিনিট</span>
              <span className="ml-2 text-xs text-gray-400">📅 {exam.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
