'use server';

import { getBaseUrl } from './getBaseUrl';
import axiosClient from './axiosClient';
import { Cart, Wishlist } from '~/types';
import { revalidateTag } from 'next/cache';

export async function addToCart(courseId: number): Promise<Cart | undefined> {
    const url = `${getBaseUrl()}/api/cart`;

    try {
        const res = await axiosClient.post(url, { courseId });
        return res.data;
    } catch (err) {
        console.error(err);
    } finally {
        revalidateTag('cart');
        revalidateTag('cart-detail');
    }
}

export async function removeCartItem(courseId: number): Promise<Cart | undefined> {
    const url = `${getBaseUrl()}/api/cart/${courseId}`;

    try {
        const res = await axiosClient.delete(url);
        return res.data;
    } catch (err) {
        console.error(err);
    } finally {
        revalidateTag('cart');
        revalidateTag('cart-detail');
    }
}

export async function addToWishlist(courseId: number): Promise<Wishlist | undefined> {
    const url = `${getBaseUrl()}/api/wishlist`;

    try {
        const res = await axiosClient.post(url, { courseId });
        return res.data;
    } catch (err) {
        console.error(err);
    } finally {
        revalidateTag('wishlist');
        revalidateTag('wishlist-detail');
    }
}

export async function removeFromWishlist(courseId: number): Promise<Wishlist | undefined> {
    const url = `${getBaseUrl()}/api/wishlist/${courseId}`;

    try {
        const res = await axiosClient.delete(url);
        return res.data;
    } catch (err) {
        console.error(err);
    } finally {
        revalidateTag('wishlist');
        revalidateTag('wishlist-detail');
    }
}
