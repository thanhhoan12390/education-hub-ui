import mongoose, { Schema, models } from 'mongoose';
import type { Course, Preview, PurchasedList, Wishlist } from '~/types';
import { getNextSequence } from '~/lib/getNextSequence';

const CourseSchema = new Schema<Course>({
    courseId: { type: Number, required: false, unique: true },
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    rating: { type: Number, required: true },
    ratingCount: { type: Number, required: true },
    price: { type: Number, required: true },
    bestSeller: { type: Boolean, required: false },
});

// Thêm middleware trước khi lưu
CourseSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.courseId = await getNextSequence('courseId');
    }
    next();
});

const PreviewSchema = new Schema<Preview>({
    previewId: { type: Number, required: true, unique: true },
    previewSrc: { type: String, required: true },
    thumbNail: { type: String, required: true },
    title: { type: String, required: true },
    previewMin: { type: String, required: true },
});

const PurchasedListSchema = new Schema<PurchasedList>({
    // userId: {type: String, require: true}, // nếu làm auth mỗi người có giỏ hàng riêng
    purchasedIds: [{ type: Number, ref: 'Course' }],
});

const WishlistSchema = new Schema<Wishlist>({
    // userId: {type: String, require: true}, // nếu làm auth mỗi người có giỏ hàng riêng
    wishedIds: [{ type: Number, ref: 'Course' }],
});

export const CourseModel = models.Course || mongoose.model<Course>('Course', CourseSchema);
export const PreviewModel = models.Preview || mongoose.model<Preview>('Preview', PreviewSchema);
export const PurchasedListModel =
    models.PurchasedList || mongoose.model<PurchasedList>('PurchasedList', PurchasedListSchema);
export const WishlistModel = models.Wishlist || mongoose.model<Wishlist>('Wishlist', WishlistSchema);
