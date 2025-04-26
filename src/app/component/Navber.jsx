"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 transition-all ease-in-out duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          Edu<span className="text-orange-500">care</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer text-green-600">
            <a href="/onlineExam">Online Exam</a>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <a href="/">Home</a>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <a href="/about">About Us</a>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <a href="/signin">Login</a>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <a href="#"></a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? (
              <X className="w-6 h-6 text-blue-600" />
            ) : (
              <Menu className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-3 bg-white shadow-md text-gray-700 font-medium transition-all ease-in-out duration-300 transform translate-y-0">
          <li>
            <a
              href="/onlineExam"
              className="hover:text-blue-600 cursor-pointer text-green-600"
            >
              Online Exam
            </a>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <a href="/">Home</a>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <a href="/about">About Us</a>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <a href="/signin">Login</a>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <a href="#"></a>
          </li>
        </ul>
      )}
    </nav>
  );
}
