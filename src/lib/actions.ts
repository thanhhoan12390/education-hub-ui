'use server';

import { getBaseUrl } from './getBaseUrl';
import axiosClient from './axiosClient';
import { Cart } from '~/types';
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
