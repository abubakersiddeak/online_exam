"use client";
import { useEffect, useState } from "react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExamResult() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterResult, setFilterResult] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [examId, setExamId] = useState("");
  const [exam, setExam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); //  নতুন স্টেট

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/student`
        );
        if (!res.ok) throw new Error("ডেটা আনতে সমস্যা হয়েছে");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        setError(err.message || "কিছু একটা ভুল হয়েছে");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchExam = async () => {
      if (!examId) return;
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/exams/${examId}`
        );
        if (!res.ok) throw new Error("পরীক্ষার তথ্য লোড করতে সমস্যা হয়েছে");
        const data = await res.json();
        setExam(data);
        setIsModalOpen(true);
      } catch (e) {
        setError("পরীক্ষার তথ্য লোড করতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };
    fetchExam();
  }, [examId]);

  const filteredStudents = students.filter((s) => {
    const matchName = s.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchResult =
      filterResult === "all" || String(s.result) === filterResult;
    return matchName && matchResult;
  });

  const isWithin7Days = (dateStr) => {
    const created = new Date(dateStr);
    const now = new Date();
    return now - created <= 7 * 24 * 60 * 60 * 1000;
  };

  const showExamModal = (e, s) => {
    e.preventDefault();
    setExamId(s.examId);
    setSelectedStudent(s); //  শিক্ষার্থীর তথ্য রাখো
  };

  return (
    <div className="p-4 max-w-5xl mx-auto ">
      <h2 className="text-3xl font-bold text-center mb-6">
        📋 শিক্ষার্থীদের তথ্য
      </h2>

      {loading && <p className="text-center text-blue-500">লোড হচ্ছে...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
            <input
              type="text"
              placeholder="🔍 নাম দিয়ে খুঁজুন"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 rounded-md shadow-sm w-full sm:w-1/2"
            />
            <select
              className="border px-4 py-2 rounded-md shadow-sm w-full sm:w-1/3"
              value={filterResult}
              onChange={(e) => setFilterResult(e.target.value)}
            >
              <option value="all">সকল ফলাফল</option>
              <option value="1">পাশ (১)</option>
              <option value="0">ফেল (০)</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <motion.table
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full border border-gray-300 shadow"
            >
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-2 border">নাম</th>
                  <th className="py-3 px-2 border">মোবাইল</th>
                  <th className="py-3 px-2 border">প্রাপ্ত নম্বর </th>
                  <th className="py-3 px-2 border">সময়</th>
                  <th className="py-3 px-2 border">৭ দিনের মধ্যে?</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s._id} className="text-center ">
                    <td
                      className="py-2 px-3 border text-blue-600 cursor-pointer"
                      onClick={(e) => showExamModal(e, s)}
                    >
                      {s.name}
                    </td>
                    <td className="py-2 px-3 border">{s.phoneNumber}</td>
                    <td className={`py-2 px-3 border font-semibold `}>
                      {s.result}
                    </td>
                    <td className="py-2 px-3 border">
                      {new Date(s.createdAt).toLocaleString("bn-BD", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="py-2 px-3 border">
                      {isWithin7Days(s.createdAt) ? " হ্যাঁ" : " না"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          </div>
        </>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && exam && selectedStudent && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className=" p-6 rounded-lg shadow-xl max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">📝 পরীক্ষার বিস্তারিত</h3>
              <p>
                <strong> শিক্ষার্থীর নাম:</strong> {selectedStudent.name}
              </p>
              <p>
                <strong>📞 মোবাইল:</strong> {selectedStudent.phoneNumber}
              </p>
              <p>
                <strong> পাপ্ত নম্বর :</strong> {selectedStudent.result}
              </p>
              <hr className="my-4" />
              <p>
                <strong> পরীক্ষার নাম:</strong> {exam.title}
              </p>
              <p>
                <strong> সময়সীমা:</strong> {exam.duration} মিনিট
              </p>

              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                বন্ধ করুন
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
