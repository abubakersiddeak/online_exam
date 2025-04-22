"use client";

import { useState } from "react";

export default function UpdateExamForm() {
  const [questionData, setQuestionData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOptionChange = (e, index) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index] = e.target.value;
    setQuestionData((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Submitting...");

    try {
      const res = await fetch("/api/exams/update-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setQuestionData({
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        });
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("❌ Error submitting exam question");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">📝 Update Exam Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="question"
          placeholder="Enter Question"
          value={questionData.question}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        {questionData.options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(e, index)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        ))}
        <input
          type="text"
          name="correctAnswer"
          placeholder="Enter Correct Answer"
          value={questionData.correctAnswer}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Question
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}
