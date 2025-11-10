import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { WishlistModel } from '~/models/CourseModel';

// GET /api/wishlist
export async function GET() {
    try {
        await connectDB();

        // Giả định chỉ có 1 cart chung
        const wishlist = await WishlistModel.findOne();

        return NextResponse.json(wishlist, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch wishlist' }, { status: 500 });
    }
}

// POST /api/wishlist
export async function POST(request: Request) {
    try {
        await connectDB();
        const { courseId } = await request.json();

        if (!courseId) {
            return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
        }

        let wishlist = await WishlistModel.findOne();

        if (!wishlist) {
            wishlist = await WishlistModel.create({ wishedIds: [courseId] });
        } else {
            // chỉ thêm nếu chưa tồn tại
            if (!wishlist.wishedIds.some((id: number) => id.toString() == courseId)) {
                wishlist.wishedIds.unshift(courseId);
                await wishlist.save();
            }
        }

        return NextResponse.json(wishlist, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
