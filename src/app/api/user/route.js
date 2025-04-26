import { connectMongodb } from "@/app/lib/mongodb";
import user from "@/app/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// POST method - User Registration
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // MongoDB এর সাথে সংযোগ
    await connectMongodb();
    const hashedPassword = await bcrypt.hash(password, 12);
    // ইউজার তৈরি
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
      role: "student", // ডিফল্ট রোল student
    });

    return NextResponse.json(
      { message: " ইউজার সফলভাবে তৈরি হয়েছে", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(" ইউজার তৈরি করার সময় ত্রুটি:", error);
    return NextResponse.json(
      { message: " ইউজার তৈরি করতে সমস্যা হয়েছে", error: error.message },
      { status: 500 }
    );
  }
}

// GET method - Get All Users
export async function GET() {
  try {
    await connectMongodb();
    const users = await user.find(); // user model ইউজ করা হয়েছে

    return new NextResponse(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(" ইউজার লোড করতে সমস্যা:", error);
    return new NextResponse(
      JSON.stringify({
        message: "ইউজার লোড করতে সমস্যা",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
