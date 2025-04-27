"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExamResult() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterResult, setFilterResult] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exam, setExam] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const fetchExam = async (examId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/exams/${examId}`
      );
      if (!res.ok) throw new Error("পরীক্ষার তথ্য লোড করতে সমস্যা হয়েছে");
      const data = await res.json();
      setExam(data);
    } catch (err) {
      setError("পরীক্ষার তথ্য লোড করতে সমস্যা হয়েছে");
    }
  };

  const handleStudentClick = async (student) => {
    setSelectedStudent(student);
    await fetchExam(student.examId);
    setIsModalOpen(true);
  };

  const filteredStudents = students.filter((s) => {
    const matchName = s.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchResult =
      filterResult === "all" || String(s.result) === filterResult;
    return matchName && matchResult;
  });

  const isWithin7Days = (dateStr) => {
    const created = new Date(dateStr);
    return new Date().getTime() - created.getTime() <= 7 * 24 * 60 * 60 * 1000;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📋 পরীক্ষার রেজাল্ট
      </h2>

      {loading && <p className="text-center text-blue-600">লোড হচ্ছে...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <div>
          <div className="mb-2 gap-2">
            <input
              type="text"
              placeholder="🔍 নাম খুঁজুন"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-2 py-1 rounded w-full text-sm"
            />
            <select
              value={filterResult}
              onChange={(e) => setFilterResult(e.target.value)}
              className="border px-2 py-1 rounded w-full text-sm"
            >
              <option value="all">সব</option>
              <option value="1">পাশ</option>
              <option value="0">ফেল</option>
            </select>
          </div>

          <div className="overflow-x-auto ">
            <table className="w-full table-auto border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-1 border text-xs font-semibold text-gray-600">
                    নাম
                  </th>
                  <th className="p-1 border text-xs font-semibold text-gray-600">
                    মোবাইল
                  </th>
                  <th className="p-1 border text-xs font-semibold text-gray-600">
                    ফল
                  </th>
                  <th className="p-1 border text-xs font-semibold text-gray-600">
                    সময়
                  </th>
                  <th className="p-1 border text-xs font-semibold text-gray-600">
                    ৭ দিন?
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="text-center cursor-pointer text-xs"
                    onClick={() => handleStudentClick(student)}
                  >
                    <td className="p-1 border">
                      {student.name.substring(0, 10)}...
                    </td>
                    <td className="p-1 border">
                      {student.phoneNumber.substring(0, 8)}...
                    </td>
                    <td className="p-1 border">
                      {student.result === "1" ? "হ্যাঁ" : "না"}
                    </td>
                    <td className="p-1 border">
                      {new Date(student.createdAt)
                        .toLocaleDateString("bn-BD")
                        .substring(0, 8)}
                    </td>
                    <td className="p-1 border">
                      {isWithin7Days(student.createdAt) ? "হ্যাঁ" : "না"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedStudent && exam && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className=" p-6 rounded-lg w-80"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-center">
                📝 পরীক্ষার বিস্তারিত
              </h3>
              <p>
                <strong>নাম:</strong> {selectedStudent.name}
              </p>
              <p>
                <strong>মোবাইল:</strong> {selectedStudent.phoneNumber}
              </p>
              <p>
                <strong>ফলাফল:</strong> {selectedStudent.result}
              </p>
              <hr className="my-4" />
              <p>
                <strong>পরীক্ষার নাম:</strong> {exam.title}
              </p>
              <p>
                <strong>সময়সীমা:</strong> {exam.duration} মিনিট
              </p>

              <button
                className="mt-6 w-full bg-red-500 hover:bg-red-600  py-2 rounded"
                onClick={() => setIsModalOpen(false)}
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
