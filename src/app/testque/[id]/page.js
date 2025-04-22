"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExamDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState({});

  useEffect(() => {
    const fetchExam = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/exams/${id}`
      );
      const data = await res.json();
      setExam(data);
    };

    if (id) fetchExam();
  }, [id]);

  const handleOptionChange = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = () => {
    const result = {};
    exam.questions.forEach((q) => {
      const selectedOptionId = answers[q._id.$oid];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      result[q._id.$oid] = selectedOptionId === correctOption._id.$oid;
    });
    setResults(result);
    setSubmitted(true);
    console.log("Student Answers:", answers);
    console.log("Results:", result);
  };

  if (!exam) {
    return <div className="text-center text-xl mt-10">লোড হচ্ছে...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">{exam.title}</h1>
      <p className="mb-6 text-gray-600">{exam.description}</p>

      {exam.questions.map((q, index) => {
        const questionId = index;
        return (
          <div
            key={questionId}
            className="mb-6 p-4 border border-gray-200 rounded-xl shadow-sm bg-white"
          >
            <h2 className="font-semibold text-lg mb-2">
              প্রশ্ন {index + 1}: {q.questionText}
            </h2>
            <div className="space-y-2">
              {q.options.map((opt) => {
                const optionId = opt._id.$oid;

                const isCorrectAnswer =
                  results[questionId] &&
                  answers[questionId] === optionId &&
                  opt.isCorrect;
                const isWrongAnswer =
                  results[questionId] &&
                  answers[questionId] === optionId &&
                  !opt.isCorrect;

                return (
                  <label
                    key={optionId}
                    className={`block cursor-pointer px-3 py-1 rounded ${
                      isCorrectAnswer
                        ? "bg-green-100 text-green-800 font-semibold"
                        : isWrongAnswer
                        ? "bg-red-100 text-red-800 font-semibold"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={questionId}
                      value={optionId}
                      checked={answers[questionId] === optionId}
                      onChange={() => handleOptionChange(questionId, optionId)}
                      className="mr-2"
                      disabled={submitted}
                    />
                    {opt.optionText}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition mt-4"
        >
          সাবমিট করুন
        </button>
      ) : (
        <div className="mt-6 text-green-600 font-semibold text-center">
          ✅ আপনার উত্তরগুলো জমা হয়েছে!{" "}
          {Object.values(results).filter(Boolean).length}/
          {exam.questions.length} সঠিক।
        </div>
      )}
    </div>
  );
}
