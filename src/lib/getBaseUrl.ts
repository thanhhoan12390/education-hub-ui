// import { headers } from 'next/headers';

export function getBaseUrl() {
    // const headersList = await headers();
    // const host = headersList.get('host');
    // const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    // return `${protocol}://${host}/`;

    return process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_URL! : 'http://localhost:3000';
}
