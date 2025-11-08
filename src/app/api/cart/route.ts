import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { CartModel } from '~/models/CartModel';

// GET /api/cart
export async function GET() {
    try {
        await connectDB();

        // Giả định chỉ có 1 cart chung
        const cart = await CartModel.findOne();

        return NextResponse.json(cart, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
    }
}

// POST /api/cart
export async function POST(request: Request) {
    try {
        await connectDB();
        const { courseId } = await request.json();

        if (!courseId) {
            return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
        }

        let cart = await CartModel.findOne();

        if (!cart) {
            cart = await CartModel.create({ courseIds: [courseId] });
        } else {
            // chỉ thêm nếu chưa tồn tại
            if (!cart.courseIds.some((id: number) => id.toString() == courseId)) {
                cart.courseIds.unshift(courseId);
                await cart.save();
            }
        }

        return NextResponse.json(cart, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
