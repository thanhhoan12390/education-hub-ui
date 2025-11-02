import { Course } from '~/types';
import { getBaseUrl } from './getBaseUrl';

export async function getCourses(): Promise<Course[]> {
    const url = `${getBaseUrl()}/api/courses`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    return res.json();
}

export async function getCourseById(id: number): Promise<Course> {
    const url = `${getBaseUrl()}/api/courses/${id}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    return res.json();
}
