import { Course } from '~/types';
import { getBaseUrl } from './getBaseUrl';

export async function getCourses(): Promise<Course[]> {
    const url = `${getBaseUrl()}/api/courses`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch courses');

    return res.json();
}
