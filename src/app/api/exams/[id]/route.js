import { NextResponse } from "next/server";

import Exam from "@/app/models/exam";
import { connectMongodb } from "@/app/lib/mongodb";

// GET /api/exams/[id]
export async function GET(request, { params }) {
  try {
    await connectMongodb();
    const { id } = await params;

    const exam = await Exam.findById(id);

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json(exam);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch exam" },
      { status: 500 }
    );
  }
}
