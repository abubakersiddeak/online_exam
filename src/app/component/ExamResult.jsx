"use client";
import { useEffect, useState } from "react";
import React from "react";
import { motion } from "framer-motion";

export default function ExamResult() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterResult, setFilterResult] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/student`
      );
      const data = await res.json();
      setStudents(data);
    };
    fetchData();
  }, []);

  const filteredStudents = students.filter((s) => {
    const matchName = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchResult =
      filterResult === "all" || String(s.result) === filterResult;
    return matchName && matchResult;
  });

  const isWithin7Days = (dateStr) => {
    const created = new Date(dateStr);
    const now = new Date();
    const diffTime = now - created;
    return diffTime <= 7 * 24 * 60 * 60 * 1000;
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        📋 শিক্ষার্থীদের তথ্য
      </h2>

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
              <th className="py-3 px-2 border">ফলাফল</th>
              <th className="py-3 px-2 border">সময়</th>
              <th className="py-3 px-2 border">৭ দিনের মধ্যে?</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s._id} className="text-center hover:bg-gray-50">
                <td className="py-2 px-3 border">{s.name}</td>
                <td className="py-2 px-3 border">{s.phoneNumber}</td>
                <td className="py-2 px-3 border text-green-600 font-semibold">
                  {s.result}
                </td>
                <td className="py-2 px-3 border">
                  {new Date(s.createdAt).toLocaleString("bn-BD", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </td>
                <td className="py-2 px-3 border">
                  {isWithin7Days(s.createdAt) ? "✅ হ্যাঁ" : "❌ না"}
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
}
