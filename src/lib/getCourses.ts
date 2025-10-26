import { getBaseUrl } from './getBaseUrl';

export async function getCourses() {
    const url = `${await getBaseUrl()}api/courses`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    return res.json();
}
