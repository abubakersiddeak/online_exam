"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Exams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        // Fetch data from your API route or database directly
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/exams`
        );
        const data = await response.json();
        setExams(data);
      } catch (err) {
        setError("Failed to load exams.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading)
    return <div className="text-center font-bold text-4xl ">Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleExamCardClick = (e, exam) => {
    e.preventDefault();
    console.log(exam._id);
    router.push(`/testque/${exam._id}`);
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-blue-700">
        📚 সব পরীক্ষা
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {exams.map((exam) => (
          <button
            key={exam._id}
            className="w-full sm:w-[300px] md:w-[300px] lg:w-[300px] xl:w-[350px] rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 p-5 border border-gray-100 hover:border-blue-300 transform hover:scale-105 text-start"
            onClick={(e) => {
              handleExamCardClick(e, exam);
            }}
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
          </button>
        ))}
      </div>
    </div>
  );
}
