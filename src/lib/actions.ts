'use server';

import { getBaseUrl } from './getBaseUrl';
import axiosClient from './axiosClient';
import { Cart } from '~/types';

export async function addToCart(courseId: number): Promise<Cart> {
    const url = `${getBaseUrl()}/api/cart`;
    const res = await axiosClient.post(url, { courseId });

    return res.data;
}
