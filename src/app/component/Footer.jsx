import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">EduCare</h2>
          <h3 className="text-xl text-gray-800 font-semibold mb-3">
            Coaching Center
          </h3>
          <p className="text-sm text-gray-600">
            Empowering learners with modern, accessible, and high-quality
            education.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/"
                className="hover:text-blue-600 transition-all duration-200"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="/about"
                className="hover:text-blue-600 transition-all duration-200"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/onlineExam"
                className="hover:text-blue-600 transition-all duration-200"
              >
                Online Exam
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="hover:text-blue-600 transition-all duration-200"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 transition-all duration-200"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-600 transition-all duration-200"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact</h3>
          <p className="text-sm">📞 +880 01781495315</p>
          <p className="text-sm">📧 Educarebd4@gmail.com</p>
          <p className="text-sm">📍 Kobutorkhula, Sreenagor, Munshigonj</p>
        </div>
      </div>

      {/* Personal Info Section */}
      <div className=" p-6 rounded-xl shadow-md mx-6 mt-8 mb-6 text-center transition-all duration-300 hover:scale-100 hover:shadow-lg">
        <p className="text-xl font-semibold mb-4">
          This application developed by{" "}
          <a
            href="https://effervescent-lokum-36bfa7.netlify.app/"
            className="text-blue-500 hover:text-blue-400 transition-all duration-300"
          >
            Abubakar Siddik Zisan
          </a>
        </p>
        <a
          href="https://new-protfolio-one.vercel.app/"
          className="text-lg text-blue-500 font-semibold hover:text-blue-400 hover:underline transition-all duration-300"
        >
          Visit My Portfolio
        </a>
      </div>

      <div className="border-t border-gray-300 mt-6 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EduCare. All rights reserved.
      </div>
    </footer>
  );
}
