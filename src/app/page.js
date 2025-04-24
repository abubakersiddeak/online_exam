"use client";
import React from "react";
import Navbar from "./component/Navber";
import Footer from "./component/Footer";
import Image from "next/image";
import { teacher } from "./db/teachers";

export default function HomePage() {
  return (
    <main className="min-h-screen font-sans bg-gradient-to-b from-sky-50 via-rose-50 to-amber-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-20 px-4 sm:py-28 sm:px-6 bg-gradient-to-br from-cyan-100/20 to-violet-200/10 rounded-xl relative overflow-hidden">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 drop-shadow-xl">
          Educare Coaching Center
        </h1>

        <p className="text-lg sm:text-xl md:text-3xl font-extrabold mb-10 max-w-3xl mx-auto text-gray-800 drop-shadow-md sm:drop-shadow-lg">
          বিশ্বাসে গড়ে উঠুক শিক্ষা,
          <br /> সাফল্যে ভরে উঠুক জীবন।
        </p>

        <hr className="w-24 mx-auto border-t-4 border-cyan-400 rounded-full my-8 opacity-80" />
      </section>

      {/* About Section */}
      <section className="text-center bg-opacity-60 rounded-xl mt-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 drop-shadow-lg">
          আমাদের শিক্ষকগণ
        </h2>

        <div className="flex gap-4 mt-10 overflow-x-auto flex-nowrap justify-around xl:justify-center px-2 ">
          {teacher.map((t, index) => (
            <div
              key={index}
              className="min-w-[120px] sm:min-w-[180px] md:min-w-[220px] bg-white/20 backdrop-blur-xl border border-white/30 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-indigo-400/40 transition-all duration-500 shrink-0"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 relative mb-4">
                  <Image
                    src={t.image}
                    alt="Teacher"
                    fill
                    className="rounded-full object-cover border-4 border-indigo-400 shadow-md"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t.name}
                </h3>
                <p className="text-gray-600 text-sm">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-4 sm:px-6 bg-transparent">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900 drop-shadow-md">
          আমাদের কোর্সসমূহ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          {[
            {
              title: "ক্লাস ৬ - ৮",
              desc: "সকল বিষয়ের উপর সম্পূর্ণ গাইডলাইন ও রিভিশন ক্লাস।",
            },
            {
              title: "ক্লাস ৯",
              desc: "SSC প্রস্তুতির জন্য জোরালো প্রস্তুতি এবং প্রশ্নব্যাংক।",
            },
            {
              title: "ক্লাস ১০",
              desc: "ফাইনাল প্রস্তুতি, মডেল টেস্ট, এবং ব্যক্তিগত মনিটরিং।",
            },
          ].map((course, i) => (
            <div
              key={i}
              className="bg-white/30 backdrop-blur-lg border border-indigo-100 p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl hover:scale-105 hover:border-pink-300 transition-transform duration-500 hover:shadow-pink-400/30"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900">
                {course.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                {course.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
