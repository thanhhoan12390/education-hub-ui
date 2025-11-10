import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { WishlistModel } from '~/models/CourseModel';

// DELETE /api/wishlist/:courseId
export async function DELETE(request: Request, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        await connectDB();
        const { courseId } = await params;

        if (!courseId) {
            return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
        }

        const wishlist = await WishlistModel.findOne();

        if (!wishlist) {
            return NextResponse.json({ error: 'Wishlist not found' }, { status: 404 });
        }

        wishlist.wishedIds = wishlist.wishedIds.filter((id: number) => id.toString() !== courseId);
        await wishlist.save();

        return NextResponse.json(wishlist, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
