import { getCourses } from '~/lib/data';

export async function generateStaticParams() {
    const courses = await getCourses();

    return courses.map((courses) => ({ id: `${courses.courseId}` }));
}

async function ViewCourse() {
    return null;
}

export default ViewCourse;
