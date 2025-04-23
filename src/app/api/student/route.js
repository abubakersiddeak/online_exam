import { connectMongodb } from "@/app/lib/mongodb"; // MongoDB connection
import Student from "@/app/models/student"; // Student model
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectMongodb(); // Connect to MongoDB

  try {
    const body = await request.json(); // Get request body
    const { name, phoneNumber, result } = body; // Destructure data from body

    // Validate required fields
    if (!name || !phoneNumber || typeof result !== "number") {
      return NextResponse.json(
        { message: "সব ফিল্ড সঠিকভাবে পূরণ করুন।" }, // Error message for invalid input
        { status: 400 }
      );
    }

    // Create new student object
    const newStudent = new Student({ name, phoneNumber, result });

    // Save student to database
    await newStudent.save();

    return NextResponse.json(
      { message: "Student সফলভাবে যোগ হয়েছে!", student: newStudent }, // Success message
      { status: 201 }
    );
  } catch (error) {
    console.error("Student POST Error:", error); // Log error for debugging
    return NextResponse.json(
      { message: "Student যোগ করতে ব্যর্থ।" }, // Error message for server failure
      { status: 500 }
    );
  }
}
