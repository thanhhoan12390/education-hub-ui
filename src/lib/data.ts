import { Course } from '~/types';
import { getBaseUrl } from './getBaseUrl';

export async function getCourses(): Promise<Course[]> {
    const url = `${getBaseUrl()}/api/courses`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch courses');

    return res.json();
}

export async function getCourseById(id: number): Promise<Course> {
    const url = `${getBaseUrl()}/api/courses/${id}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch course id ${id}`);

    return res.json();
}
