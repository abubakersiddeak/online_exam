"use client";
import React from "react";
import Navbar from "./component/Navber";
import Footer from "./component/Footer";
import Image from "next/image";
import { teacher } from "./db/teachers";

export default function HomePage() {
  return (
    <main
      className="min-h-screen font-sans"
      style={{
        backgroundImage: "url('/7402282.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-20 px-4 sm:py-28 sm:px-6 bg-transparent">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-xl">
          Educare Coaching Center
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-medium mb-10 max-w-3xl mx-auto text-gray-300">
          আমাদের সাথে গড়ুন আপনার ভবিষ্যৎ। আমাদের অভিজ্ঞ শিক্ষক দল আপনাকে সফলতার
          পথে গাইড করবে।
        </p>
      </section>

      {/* About Section */}
      <section className="  text-center bg-opacity-60 rounded-xl sm:rounded-3xl shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-cyan-400 drop-shadow-lg">
          আমাদের শিক্ষকগণ
        </h2>

        <div className="flex gap-8 mt-10 overflow-x-auto flex-nowrap justify-center">
          {teacher.map((t, index) => (
            <div
              key={index}
              className="min-w-[150px] sm:min-w-[200px] md:min-w-[220px] bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-500 shrink-0"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 relative mb-4">
                  <Image
                    src={t.image}
                    alt="Teacher"
                    fill
                    className="rounded-full object-cover border-4 border-cyan-400 shadow-md"
                  />
                </div>
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                  {t.name}
                </h3>
                <p className="text-gray-300 text-sm">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-4 sm:px-6 bg-transparent">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-white drop-shadow-md">
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
              className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl hover:scale-105 hover:border-cyan-400 transition-transform duration-500 hover:shadow-cyan-500/30"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-cyan-300">
                {course.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
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
