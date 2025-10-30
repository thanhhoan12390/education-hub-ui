import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { CourseModel } from '~/models/CourseModel';

// GET /api/courses/:id
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    //Nếu bỏ tham số request (dù không dùng),
    //thì Next.js sẽ hiểu sai vị trí của params → khiến params trở thành undefined
    try {
        await connectDB();

        const { id } = await params;

        const course = await CourseModel.findOne({ courseId: Number(id) });
        if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 });

        return NextResponse.json(course);
    } catch (error) {
        console.error('❌ Error fetching course:', error);
        return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 });
    }
}
