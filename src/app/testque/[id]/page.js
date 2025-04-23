"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

const Page = () => {
  const params = useParams();
  const id = params.id;

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState({});
  const [start, setStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch exam data
  useEffect(() => {
    const fetchExam = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/exams/${id}`
        );
        if (!res.ok) {
          throw new Error(
            `HTTP error! status: ${res.status} - ${res.statusText}`
          );
        }
        const data = await res.json();
        setExam(data);
        if (data?.duration) {
          setTimeLeft(data.duration * 60); // Exam time in seconds
        }
      } catch (e) {
        setError("পরীক্ষার তথ্য লোড করতে সমস্যা হয়েছে।");
        console.error("Error fetching exam:", e);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchExam();
  }, [id]);

  // Timer logic
  useEffect(() => {
    let timer;
    if (start && !submitted && timeLeft > 0) {
      timer = setTimeout(() => {
        handleSubmit();
      }, timeLeft * 1000);
    }

    return () => clearTimeout(timer);
  }, [start, submitted, timeLeft]);

  useEffect(() => {
    let countdown;
    if (start && !submitted && timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && !submitted && start) {
      handleSubmit();
    }

    return () => clearInterval(countdown);
  }, [start, submitted, timeLeft]);

  // Helper function to format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Handle option selection
  const handleOptionChange = useCallback(
    (questionIndex, optionId) => {
      if (!submitted) {
        setAnswers((prev) => ({
          ...prev,
          [questionIndex]: optionId,
        }));
      }
    },
    [submitted]
  );

  // Handle exam submission
  const handleSubmit = useCallback(() => {
    if (!exam || !exam.questions || submitted) return;

    const calculatedResults = {};
    exam.questions.forEach((q, index) => {
      const selectedOptionId = answers[index];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      calculatedResults[index] = selectedOptionId === correctOption?._id?.$oid;
    });

    setResults(calculatedResults);
    setSubmitted(true);
  }, [exam, answers, submitted]);

  // Handle start exam
  const handleStartClick = () => {
    setStart(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        লোড হচ্ছে...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="flex justify-center items-center h-screen">
        পরীক্ষার তথ্য পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          {exam.title}
        </h1>
        <p className="text-gray-700 mb-4 text-center">{exam.description}</p>

        {!start && (
          <div className="flex justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
              onClick={handleStartClick}
            >
              পরীক্ষা শুরু করুন
            </button>
          </div>
        )}

        {start && !submitted && (
          <div className="text-center text-red-600 font-bold text-xl my-6">
            বাকি সময়: {formatTime(timeLeft)}
          </div>
        )}

        <div className={`${start ? "block" : "hidden"} mt-6`}>
          {exam.questions.map((q, index) => (
            <div
              key={index}
              className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
            >
              <h2 className="font-semibold text-lg text-gray-800 mb-3">
                প্রশ্ন {index + 1}: {q.questionText}
              </h2>
              <div className="space-y-3">
                {q.options.map((opt) => {
                  const optionId = opt._id;
                  const isCorrectAnswer =
                    submitted &&
                    results[index] === true &&
                    answers[index] === optionId &&
                    opt.isCorrect;
                  const isWrongAnswer =
                    submitted &&
                    results[index] === false &&
                    answers[index] === optionId &&
                    !opt.isCorrect;
                  const isCorrectOption = submitted && opt.isCorrect;

                  return (
                    <label
                      key={optionId}
                      className={`block cursor-pointer rounded py-2 px-3 ${
                        isCorrectAnswer
                          ? "bg-green-100 text-green-800 font-semibold"
                          : isWrongAnswer
                          ? "bg-red-100 text-red-800 font-semibold"
                          : isCorrectOption
                          ? "bg-green-50 text-green-800"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={optionId}
                        checked={answers[index] === optionId}
                        onChange={() => handleOptionChange(index, optionId)}
                        className="mr-2 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        disabled={submitted}
                      />
                      {opt.optionText}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {start && !submitted && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out focus:outline-none focus:shadow-outline"
            >
              সাবমিট করুন
            </button>
          </div>
        )}

        {submitted && (
          <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-center font-semibold">
            ✅ আপনার উত্তরগুলো জমা হয়েছে! আপনি{" "}
            {Object.values(results).filter((v) => v === true).length} টি
            প্রশ্নের মধ্যে {exam.questions.length} টির সঠিক উত্তর দিয়েছেন।
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
