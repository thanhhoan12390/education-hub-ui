import { NextResponse } from 'next/server';
import { connectDB } from '~/lib/mongodb';
import { PurchasedListModel, WishlistModel } from '~/models/CourseModel';
import { CartModel } from '~/models/CartModel';

// GET /api/purchased-list
export async function GET() {
    try {
        await connectDB();

        // Giả định chỉ có 1 cart chung
        const purchasedList = await PurchasedListModel.findOne();

        return NextResponse.json(purchasedList, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch purchased list' }, { status: 500 });
    }
}

// POST /api/purchased-list
// courseIds: number[]
export async function POST(request: Request) {
    try {
        await connectDB();
        const { courseIds } = await request.json();

        if (!Array.isArray(courseIds) || courseIds.length === 0) {
            return NextResponse.json({ error: 'Missing or invalid courseIds' }, { status: 400 });
        }

        // 1-Cập nhật PurchasedList
        let purchasedList = await PurchasedListModel.findOne();

        if (!purchasedList) {
            purchasedList = await PurchasedListModel.create({ purchasedIds: courseIds });
        } else {
            // chỉ thêm những ID chưa tồn tại
            const existingIds = purchasedList.purchasedIds.map((id: number) => id.toString());
            const newIds = courseIds.filter((id: number) => !existingIds.includes(id.toString()));

            if (newIds.length > 0) {
                // thêm lên đầu danh sách (giữ logic unshift)
                purchasedList.purchasedIds.unshift(...newIds);
                await purchasedList.save();
            }
        }

        // 2-Xóa các ID đã mua khỏi Cart và Wishlist
        await Promise.all([
            CartModel.updateMany({}, { $pull: { courseIds: { $in: courseIds } } }),
            WishlistModel.updateMany({}, { $pull: { wishedIds: { $in: courseIds } } }),
        ]);

        // 3-Trả về kết quả
        return NextResponse.json(purchasedList, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
