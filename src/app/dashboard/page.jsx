"use client";
import { useState, useRef } from "react";

export default function PostExamForm() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    questions: [],
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText: "",
      options: [
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
        { optionText: "", isCorrect: false },
      ],
    };
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][name] = value;
    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const { name, type, value, checked } = e.target;
    const updatedQuestions = [...formData.questions];

    updatedQuestions[questionIndex].options[optionIndex][name] =
      type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Submitting...");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/exams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          duration: Number(formData.duration),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setFormData({
          title: "",
          description: "",
          duration: "",
          questions: [],
        });
        formRef.current.reset();
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("❌ Error submitting exam");
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
          📋 Create New Exam
        </h2>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Exam Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <input
              type="number"
              name="duration"
              placeholder="Duration (minutes)"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Dynamic Questions */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              Add Questions
            </h3>
            {formData.questions.map((question, index) => (
              <div
                key={index}
                className="mb-6 p-6 bg-gray-100 rounded-md border"
              >
                <input
                  type="text"
                  name="questionText"
                  placeholder="Question text"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(index, e)}
                  required
                  className="w-full px-4 py-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                {/* Options */}
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-4">
                    <input
                      type="text"
                      name="optionText"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option.optionText}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e)
                      }
                      required
                      className="w-full px-4 py-3 border rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <input
                      type="checkbox"
                      name="isCorrect"
                      checked={option.isCorrect}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e)
                      }
                      className="h-6 w-6"
                    />
                    <span className="ml-2 text-gray-600">Correct Answer</span>
                  </div>
                ))}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddQuestion}
              className="text-blue-600 hover:underline mt-4 block"
            >
              ➕ Add Another Question
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            ✅ Save Exam
          </button>

          {message && (
            <p className="mt-4 text-center text-gray-600">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
