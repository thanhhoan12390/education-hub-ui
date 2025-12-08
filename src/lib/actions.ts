'use server';

import { getBaseUrl } from './getBaseUrl';
import axiosClient from './axiosClient';
import { Cart, Note, PurchasedList, Wishlist } from '~/types';
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

export async function checkoutCourses(cart: number[]): Promise<PurchasedList | undefined> {
    const url = `${getBaseUrl()}/api/purchased-list`;

    try {
        const res = await axiosClient.post(url, { courseIds: cart });
        return res.data;
    } catch (error) {
        console.error(error);
    } finally {
        revalidateTag('cart');
        revalidateTag('cart-detail');
        revalidateTag('wishlist');
        revalidateTag('wishlist-detail');
        revalidateTag('purchased-list');
        revalidateTag('purchased-list-detail');
        revalidateTag('courses');
    }
}

export async function addNote(noteInfo: Omit<Note, 'noteId'>): Promise<Note | undefined> {
    const url = `${getBaseUrl()}/api/notes`;

    try {
        const res = await axiosClient.post(url, noteInfo);
        return res.data;
    } catch (error) {
        console.error(error);
    } finally {
        revalidateTag('notes');
    }
}

export async function updateNote(
    noteId: number,
    updateFields: Partial<Omit<Note, 'noteId'>>,
): Promise<Note | undefined> {
    const url = `${getBaseUrl()}/api/notes/${noteId}`;

    try {
        const res = await axiosClient.patch(url, updateFields);
        return res.data;
    } catch (error) {
        console.error(error);
    } finally {
        revalidateTag('notes');
    }
}

export async function deleteNote(noteId: number) {
    const url = `${getBaseUrl()}/api/notes/${noteId}`;

    try {
        const res = await axiosClient.delete(url);
        return res.data;
    } catch (error) {
        console.error(error);
    } finally {
        revalidateTag('notes');
    }
}
