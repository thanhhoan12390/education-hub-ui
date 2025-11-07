import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { CartModel } from '~/models/CartModel';

// DELETE /api/cart/:courseId
export async function DELETE(request: Request, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        await connectDB();
        const { courseId } = await params;

        if (!courseId) {
            return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
        }

        const cart = await CartModel.findOne();

        if (!cart) {
            return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
        }

        cart.courseIds = cart.courseIds.filter((id: number) => id.toString() !== courseId);
        await cart.save();

        return NextResponse.json(cart, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
