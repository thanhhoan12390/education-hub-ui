import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { PurchasedListModel } from '~/models/CourseModel';
import { CourseModel } from '~/models/CourseModel';

// GET /api/purchased-list/detail
export async function GET() {
    try {
        await connectDB();

        // Giả định chỉ có 1 cart chung
        const PurchasedList = await PurchasedListModel.findOne();
        if (!PurchasedList || PurchasedList.purchasedIds.length === 0) {
            return NextResponse.json([], { status: 200 });
        }

        // Lấy danh sách khóa học theo mảng id
        const purchasedCourses = await CourseModel.aggregate([
            { $match: { courseId: { $in: PurchasedList.purchasedIds } } },
            { $addFields: { order: { $indexOfArray: [PurchasedList.purchasedIds, '$courseId'] } } },
            { $sort: { order: 1 } },
            {
                $project: {
                    _id: 1, // 0 nếu không muốn _id
                    courseId: 1,
                    imageUrl: 1,
                    title: 1,
                    instructor: 1,
                    rating: 1,
                    ratingCount: 1,
                    price: 1,
                    bestSeller: 1,
                },
            },
        ]);

        return NextResponse.json(purchasedCourses, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch detail purchased list' }, { status: 500 });
    }
}
