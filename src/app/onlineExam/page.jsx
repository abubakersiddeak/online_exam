import React from "react";
import Navbar from "../component/Navber";

import Footer from "../component/Footer";
import Exams from "../component/Exams";

export default function page() {
  return (
    <div>
      <Navbar />
      <Exams />
      <Footer />
    </div>
  );
}
