import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { CourseModel } from '~/models/CourseModel';

// GET /api/courses
export async function GET() {
    await connectDB();

    const courses = await CourseModel.find();
    return NextResponse.json(courses);
}

// POST /api/courses
export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const course = await CourseModel.create(body);

        return NextResponse.json(course, { status: 201 });
    } catch (error) {
        console.error('❌ Error creating course:', error);
        return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
    }
}
