import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { CourseModel, PurchasedListModel } from '~/models/CourseModel';

// GET /api/courses
export async function GET() {
    await connectDB();

    // 1️-Lấy danh sách khóa học đã mua
    const purchasedList = await PurchasedListModel.findOne();

    // 2️-Nếu có, loại bỏ các course đã mua
    let filter: Record<string, { $nin: number[] }> = {};
    if (purchasedList && purchasedList.purchasedIds.length > 0) {
        filter = { courseId: { $nin: purchasedList.purchasedIds } };
    }

    // 3️-Lấy danh sách khóa học chưa mua
    const courses = await CourseModel.find(filter);

    return NextResponse.json(courses, { status: 200 });
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
