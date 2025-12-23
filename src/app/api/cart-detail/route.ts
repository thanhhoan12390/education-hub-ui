import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { CartModel } from '~/models/CartModel';
import { CourseModel } from '~/models/CourseModel';

// GET /api/cart-detail
export async function GET() {
    try {
        await connectDB();

        // Giả định chỉ có 1 cart chung
        const cart = await CartModel.findOne();
        if (!cart || cart.courseIds.length === 0) {
            return NextResponse.json([], { status: 200 });
        }

        // Lấy danh sách khóa học theo mảng id
        const courses = await CourseModel.aggregate([
            { $match: { courseId: { $in: cart.courseIds } } },
            { $addFields: { order: { $indexOfArray: [cart.courseIds, '$courseId'] } } },
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
                    level: 1,
                    hasExercises: 1,
                    hasPracticeTest: 1,
                },
            },
        ]);

        return NextResponse.json(courses, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch cart detail' }, { status: 500 });
    }
}
