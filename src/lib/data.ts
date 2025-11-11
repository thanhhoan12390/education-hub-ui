import { Cart, Course, Wishlist } from '~/types';
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

export async function getCart(): Promise<Cart> {
    const url = `${getBaseUrl()}/api/cart`;
    const res = await fetch(url, { next: { revalidate: 3600, tags: ['cart'] } });

    return res.json();
}

export async function getCartDetail(): Promise<Course[]> {
    const url = `${getBaseUrl()}/api/cart-detail`;
    const res = await fetch(url, { next: { revalidate: 3600, tags: ['cart-detail'] } });

    return res.json();
}

export async function getWishlist(): Promise<Wishlist> {
    const url = `${getBaseUrl()}/api/wishlist`;
    const res = await fetch(url, { next: { revalidate: 3600, tags: ['wishlist'] } });

    return res.json();
}

export async function getWishlistDetail(): Promise<Course[]> {
    const url = `${getBaseUrl()}/api/wishlist/detail`;
    const res = await fetch(url, { next: { revalidate: 3600, tags: ['wishlist-detail'] } });

    return res.json();
}
