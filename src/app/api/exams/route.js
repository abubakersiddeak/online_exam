import { connectMongodb } from "@/app/lib/mongodb";
import exam from "@/app/models/exam";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, description, duration, questions } = await request.json();

    // প্রশ্নের অ্যারে যাচাই করা
    if (!Array.isArray(questions)) {
      return NextResponse.json(
        { message: "❌ প্রশ্নগুলির ফরম্যাট ভুল। এটি একটি অ্যারে হতে হবে।" },
        { status: 400 }
      );
    }

    // MongoDB এর সাথে সংযোগ
    await connectMongodb();

    // এক্সাম ডকুমেন্ট তৈরি, যেখানে প্রশ্নও সেভ হবে
    const newExam = await exam.create({
      title,
      description,
      duration,
      questions, // এই অংশে প্রশ্নও সেভ হবে
    });

    return NextResponse.json(
      { message: "✅ এক্সাম সফলভাবে সেভ করা হয়েছে", exam: newExam },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ এক্সাম পোস্ট করার সময় ত্রুটি:", error);
    return NextResponse.json(
      { message: "❌ এক্সাম পোস্ট করতে সমস্যা হয়েছে", error: error.message },
      { status: 500 }
    );
  }
}
