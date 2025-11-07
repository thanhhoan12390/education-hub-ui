import mongoose, { Schema, models } from 'mongoose';
import type { Cart } from '~/types';

const CartSchema = new Schema<Cart>({
    // userId: {type: String, require: true}, // nếu làm auth mỗi người có giỏ hàng riêng
    courseIds: [{ type: Number, ref: 'Course' }],
});

export const CartModel = models.Cart || mongoose.model<Cart>('Cart', CartSchema);
