import mongoose, { Schema, models } from 'mongoose';
import type { Course } from '~/types';
import { getNextSequence } from '~/lib/getNextSequence';

const CourseSchema = new Schema<Course>({
    courseId: { type: Number, required: false, unique: true },
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    rating: { type: Number, required: true },
    ratingCount: { type: String, required: true },
    price: { type: String, required: true },
});

// Thêm middleware trước khi lưu
CourseSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.courseId = await getNextSequence('courseId');
    }
    next();
});

export const CourseModel = models.Course || mongoose.model<Course>('Course', CourseSchema);
