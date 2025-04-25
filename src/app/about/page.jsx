import React from "react";
import { teacher } from "../db/teachers";
import Navbar from "../component/Navber";
import Footer from "../component/Footer";
import Image from "next/image";

const teachers = teacher;

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-b from-sky-50 via-rose-50 to-amber-50 text-gray-900 min-h-screen px-4 py-6 sm:px-8 sm:py-10 ">
        {/* হিরো সেকশন */}
        <section className="text-center mb-10 pt-13">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-blue-600 leading-tight">
            এডুকেয়ার কোচিং সেন্টারে স্বাগতম
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto">
            "শিক্ষা, তবু শিক্ষা যদি শিকল না হয়, <br /> প্রাণে প্রাণে জ্বলে যাক
            আলো, জ্বলে চিত্তে। <br /> শিখে শেখা চলুক শিখা, বিদ্যার মহল তৈরি হোক
            <br /> যেখানে মনের অন্ধকার ছিঁড়ে বেরিয়ে আসবে জীবন।"
          </p>
        </section>
        {/* আমাদের সম্পর্কে */}
        <section className="bg-white rounded-xl shadow-md p-5 sm:p-8 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-500 mb-3 text-center">
            আমাদের সম্পর্কে
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            আমরা গভীরভাবে বিশ্বাস করি, প্রতিটি শিক্ষার্থী নিজের মধ্যে অসীম মেধা
            ও সম্ভাবনা ধারণ করে। আমাদের লক্ষ্য হলো, সেই লুকানো প্রতিভা এবং
            শক্তিকে উদ্ভাসিত করা, যা একজন শিক্ষার্থীর অজানা কণ্ঠস্বরকে বিশ্বের
            কাছে পৌঁছে দিতে পারে। আমরা পরিশ্রমী, আন্তরিক ও একাগ্রভাবে কাজ করি,
            যেন প্রতিটি শিক্ষার্থী তার স্বপ্নের পথে দৃঢ় পদক্ষেপ নিতে পারে এবং
            নিজের সর্বোচ্চ সীমা ছুঁতে পারে। আমাদের বিশ্বাস, সঠিক দিকনির্দেশনা
            এবং প্রেরণায় প্রতিটি শিক্ষার্থী নিজের অমূল্য প্রতিভার পরিচয় দিতে
            সক্ষম।
          </p>
        </section>
        {/* শিক্ষক প্যানেল */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-green-600 mb-5 text-center">
            আমাদের শিক্ষকবৃন্দ
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  width={300} // Set width
                  height={300} // Set height
                  className="w-full h-70 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold text-blue-600">
                  {teacher.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  {teacher.qualification}
                </p>
                <p className="text-gray-700 text-sm">{teacher.subject}</p>
              </div>
            ))}
          </div>
        </section>
        {/* location */}
        <section className="bg-white rounded-xl shadow-md p-5 sm:p-8 mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-500 mb-4 text-center">
            আমাদের অবস্থান
          </h2>
          <p className="text-gray-700 text-sm sm:text-base text-center mb-4">
            ঠিকানা: কবুতরখোলা, রাড়িখাল, শ্রীনগর, মুন্সিগঞ্জ, বাংলাদেশ।
          </p>
          <div className="w-full h-64 sm:h-96 rounded-lg overflow-hidden">
            <iframe
              title="Coaching Center Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14621.872940387133!2d90.22962585!3d23.50310495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375599546d7e355f%3A0xb7b46e07796a8c89!2z4KaG4Kas4Ka-4KaV4Kao4Ka-4KaH4Ka44Ka-4KaoIOCmrOCnjeCmsOCmv-CmvuCmsOCnh-CmqA!5e0!3m2!1sen!2sbd!4v1714051450731!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
