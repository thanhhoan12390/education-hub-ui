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
        const courses = await CourseModel.find({
            courseId: { $in: cart.courseIds },
        }).select('courseId imageUrl title instructor rating ratingCount price bestSeller');

        return NextResponse.json(courses, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch cart detail' }, { status: 500 });
    }
}
