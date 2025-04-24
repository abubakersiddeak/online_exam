"use client";

import Footer from "@/app/component/Footer";
import Navbar from "@/app/component/Navber";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

const Page = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState({});
  const [start, setStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });

  const handleSubmitStudent = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/student`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            result: Object.values(results).filter((v) => v === true).length,
            total: exam?.questions?.length || 0,
            examId: exam?._id,
          }),
        }
      );

      const studentdata = await res.json();
      console.log("✅ Student submitted:", studentdata);
    } catch (error) {
      console.error("❌ Error submitting student:", error);
    }
  };

  useEffect(() => {
    const fetchExam = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/exams/${id}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setExam(data);
        if (data?.duration) {
          setTimeLeft(data.duration * 60);
        }
      } catch (e) {
        setError("পরীক্ষার তথ্য লোড করতে সমস্যা হয়েছে।");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchExam();
  }, [id]);

  // Auto-submit after time runs out
  useEffect(() => {
    if (start && !submitted && timeLeft === 0) {
      handleSubmit();
    }

    let countdown;
    if (start && !submitted && timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [start, submitted, timeLeft]);

  useEffect(() => {
    if (submitted && Object.keys(results).length > 0) {
      handleSubmitStudent();
    }
  }, [results, submitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

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

  // Handle Submit
  const handleSubmit = useCallback(() => {
    if (!exam || !exam.questions || submitted) return;

    if (!formData.name.trim() || !formData.phoneNumber.trim()) {
      alert("দয়া করে আপনার নাম এবং মোবাইল নাম্বার দিন।");
      return;
    }

    const calculatedResults = {};
    exam.questions.forEach((q, index) => {
      const selectedOptionId = answers[index];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      calculatedResults[index] = selectedOptionId === correctOption?._id;
    });

    setResults(calculatedResults);
    setSubmitted(true);
  }, [exam, answers, submitted, formData]);

  const handleStartClick = () => setStart(true);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg font-semibold text-gray-600">
          লোড হচ্ছে...
        </span>
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
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
        পরীক্ষার তথ্য পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-100 px-4 mt-9">
        <div className="bg-white text-gray-800 p-6 sm:p-10 rounded-xl shadow-md max-w-3xl w-full mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 text-center mb-4">
            {exam.title}
          </h1>
          <p className="text-center text-gray-500 mb-6">{exam.description}</p>

          {!start && (
            <div className="flex justify-center">
              <button
                onClick={handleStartClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-full transition"
              >
                পরীক্ষা শুরু করুন
              </button>
            </div>
          )}

          {start && !submitted && (
            <div className="text-center my-4 text-base text-pink-600 font-medium">
              ⏰ বাকি সময়: {formatTime(timeLeft)}
            </div>
          )}

          {start && (
            <>
              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="আপনার নাম"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="মোবাইল নাম্বার"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </div>

              {exam.questions.map((q, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 rounded-md border border-gray-200"
                >
                  <h2 className="text-base font-semibold mb-3 text-gray-700">
                    প্রশ্ন {index + 1}: {q.questionText}
                  </h2>
                  <div className="space-y-2">
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
                          className={`block p-2 rounded-md cursor-pointer border ${
                            isCorrectAnswer
                              ? "bg-green-100 border-green-400"
                              : isWrongAnswer
                              ? "bg-red-100 border-red-400"
                              : isCorrectOption
                              ? "bg-green-50 border-green-300"
                              : "hover:bg-gray-100 border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={optionId}
                            checked={answers[index] === optionId}
                            onChange={() => handleOptionChange(index, optionId)}
                            className="mr-2"
                            disabled={submitted}
                          />
                          {opt.optionText}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>
          )}

          {start && !submitted && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition"
              >
                সাবমিট করুন
              </button>
            </div>
          )}

          {submitted && (
            <div className="mt-6 text-center text-green-600 font-medium bg-green-50 border border-green-200 rounded-md p-4">
              ✅ আপনার উত্তরগুলো জমা হয়েছে! আপনি {exam.questions.length} টি
              প্রশ্নের মধ্যে{" "}
              {Object.values(results).filter((v) => v === true).length} টির সঠিক
              উত্তর দিয়েছেন।
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
