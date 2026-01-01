import { NextResponse } from 'next/server';
// import { Level } from '~/components/features/search/SearchFiltersBar/SearchFiltersBar';
import { connectDB } from '~/lib/mongodb';
import { CourseModel, PurchasedListModel } from '~/models/CourseModel';

// const LEVELS: Readonly<Level[]> = ['all', 'beginner', 'intermediate', 'expert'];

// GET /api/courses
export async function GET(req: Request) {
    await connectDB();

    const search = new URL(req.url).searchParams;

    // const languages = search.getAll('lang'); // tạm thời chưa dùng

    // const levels = search.getAll('level').filter((l) => LEVELS.includes(l as Level) && l !== 'all');
    const levels = search.getAll('level');

    const rating = search.get('rating');
    const hasExercises = search.get('hasExercises');
    const hasPracticeTest = search.get('hasPracticeTest');

    // ---- purchased filter ----
    const purchasedList = await PurchasedListModel.findOne();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};

    if (purchasedList?.purchasedIds?.length) {
        filter.courseId = { $nin: purchasedList.purchasedIds };
    }

    // ---- LEVEL ----
    if (levels.length > 0) {
        filter.level = { $in: levels };
    }

    // ---- RATING ----
    if (rating) {
        filter.rating = { $gte: Number(rating) };
    }

    // ---- boolean filters ----
    if (hasExercises !== null) {
        filter.hasExercises = hasExercises === 'true';
    }

    if (hasPracticeTest !== null) {
        filter.hasPracticeTest = hasPracticeTest === 'true';
    }

    // ---- QUERY ----
    const courses = await CourseModel.find(filter);

    return NextResponse.json(courses, { status: 200 });
}

// POST /api/courses
export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const course = await CourseModel.create(body);

        return NextResponse.json(course, { status: 201 });
    } catch (error) {
        console.error('❌ Error creating course:', error);
        return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
    }
}
