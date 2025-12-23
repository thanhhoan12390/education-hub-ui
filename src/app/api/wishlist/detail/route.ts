import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { WishlistModel } from '~/models/CourseModel';
import { CourseModel } from '~/models/CourseModel';

// GET /api/wishlist/detail
export async function GET() {
    try {
        await connectDB();

        // Giả định chỉ có 1 cart chung
        const wishlist = await WishlistModel.findOne();
        if (!wishlist || wishlist.wishedIds.length === 0) {
            return NextResponse.json([], { status: 200 });
        }

        // Lấy danh sách khóa học theo mảng id
        const wishedCourses = await CourseModel.aggregate([
            { $match: { courseId: { $in: wishlist.wishedIds } } },
            { $addFields: { order: { $indexOfArray: [wishlist.wishedIds, '$courseId'] } } },
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

        return NextResponse.json(wishedCourses, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch detail wishlist' }, { status: 500 });
    }
}
