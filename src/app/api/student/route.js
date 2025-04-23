import { connectMongodb } from "@/app/lib/mongodb"; // MongoDB connection
import Student from "@/app/models/student"; // Student model
import { NextResponse } from "next/server";

// POST API: Add a new student
export async function POST(request) {
  await connectMongodb();

  try {
    const body = await request.json();
    const { name, phoneNumber, result } = body;

    if (!name || !phoneNumber || typeof result !== "number") {
      return NextResponse.json(
        { message: "সব ফিল্ড সঠিকভাবে পূরণ করুন।" },
        { status: 400 }
      );
    }

    const newStudent = new Student({ name, phoneNumber, result });
    await newStudent.save();

    return NextResponse.json(
      { message: "Student সফলভাবে যোগ হয়েছে!", student: newStudent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Student POST Error:", error);
    return NextResponse.json(
      { message: "Student যোগ করতে ব্যর্থ।" },
      { status: 500 }
    );
  }
}

// ✅ GET API: Get all students
export async function GET() {
  await connectMongodb();

  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return NextResponse.json(students);
  } catch (error) {
    console.error("Student GET Error:", error);
    return NextResponse.json(
      { message: "Student তথ্য আনতে সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}
