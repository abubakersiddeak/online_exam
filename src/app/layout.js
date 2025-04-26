import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EduCare | Learn with Passion",
  description: "EduCare কোচিং সেন্টার – যেখানে প্রতিটি শিক্ষার্থী মেধাবী।",
  keywords: ["Education", "Coaching", "Bangladesh", "Online Exam", "EduCare"],
  authors: [
    {
      name: "Abubakar Siddik Zisan",
      url: "https://effervescent-lokum-36bfa7.netlify.app/",
    },
  ],
  openGraph: {
    title: "EduCare",
    description: "আমরা শিক্ষার্থীদের মেধা ও আত্মবিশ্বাস গড়ে তুলি।",
    url: "https://online-exam-nine.vercel.app/",
    siteName: "EduCare",
    images: [
      {
        url: "/4f984418-1b26-4f21-97be-1c6965c39022.jpg", // public ফোল্ডারে ইমেজ রাখুন
        width: 1200,
        height: 630,
        alt: "EduCare Coaching",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
