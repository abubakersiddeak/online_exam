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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/exams`
        );
        const data = await response.json();
        const sortedExams = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setExams(sortedExams);
      } catch (err) {
        setError("Failed to load exams.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-4xl text-blue-600 font-bold">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-xl">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-blue-50 to-purple-100 px-4 py-12 ">
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-extrabold text-center bg-gradient-to-r text-gray-700  mb-10 bg-clip-text  drop-shadow-lg mt-12 sm:mt-16 lg:mt-16 xl:mt-10">
          বাছাইকৃত প্রশ্নের সাথে যাচাই করো নিজেকে
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {exams.map((exam) => (
            <div
              key={exam._id}
              onClick={(e) => {
                e.preventDefault();
                router.push(`/testque/${exam._id}`);
              }}
              className="cursor-pointer bg-white bg-opacity-80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 shadow-xl hover:shadow-blue-300 transition duration-300 hover:scale-[1.03]"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {exam.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{exam.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-200 mt-4">
                <span>⏱️ সময়: {exam.duration} মিনিট</span>
                <span className="text-xs text-gray-400"> {exam.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
