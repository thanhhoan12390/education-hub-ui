import { getCourses, getCourseById, getPurchasedList } from '~/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const courses = await getCourses();

    return courses.map((course) => ({ id: `${course.courseId}` }));
}

async function ViewCourse({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const course = await getCourseById(+id);
    const purchasedList = await getPurchasedList();

    if (!course.courseId || purchasedList.purchasedIds.includes(+id)) {
        notFound();
    }

    return null;
}

export default ViewCourse;
