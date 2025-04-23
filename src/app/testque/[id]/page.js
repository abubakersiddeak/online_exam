"use client";

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

  const handleSubmit = useCallback(() => {
    if (!exam || !exam.questions || submitted) return;

    const calculatedResults = {};
    exam.questions.forEach((q, index) => {
      const selectedOptionId = answers[index];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      calculatedResults[index] = selectedOptionId === correctOption?._id;
    });

    setResults(calculatedResults);
    setSubmitted(true);
    handleSubmitStudent();
  }, [exam, answers, submitted]);

  const handleStartClick = () => setStart(true);

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
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full"
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

        {start && (
          <>
            <div className="mt-6">
              <input
                type="text"
                className="border block p-2 m-3 rounded-xl w-full"
                placeholder="আপনার নাম"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="number"
                className="border block p-2 m-3 rounded-xl w-full"
                placeholder="মোবাইল নাম্বার"
                required
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>

            {exam.questions.map((q, index) => (
              <div
                key={index}
                className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50"
              >
                <h2 className="font-semibold text-lg text-gray-800 mb-3">
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
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full"
            >
              সাবমিট করুন
            </button>
          </div>
        )}

        {submitted && (
          <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-center font-semibold">
            ✅ আপনার উত্তরগুলো জমা হয়েছে! আপনি {exam.questions.length} টি
            প্রশ্নের মধ্যে{" "}
            {Object.values(results).filter((v) => v === true).length} টির সঠিক
            উত্তর দিয়েছেন।
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
