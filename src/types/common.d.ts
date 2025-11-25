import type { StaticImageData } from 'next/image';

export interface MenuItem {
    title: string | null;
    to: string;
    children: MenuItem[]; // đệ quy
}

export interface Course {
    courseId: number;
    imageUrl: string | StaticImageData;
    title: string;
    instructor: string;
    rating: number;
    ratingCount: number;
    price: number;
    bestSeller?: boolean;
}

export interface ListParams {
    offset?: number;
    limit?: number;
}

export interface Preview {
    previewSrc: string;
    previewId: number;
    thumbNail: string;
    title: string;
    previewMin: string;
}

export interface Cart {
    // userId: string;
    courseIds: number[];
}

export interface PurchasedList {
    // userId: string;
    purchasedIds: number[];
}

export interface Wishlist {
    // userId: string;
    wishedIds: number[];
}

export interface StreamingPlayerHandle {
    // getCurrentTime: () => number | undefined;
    play: () => Promise<void> | undefined;
    pause: () => void | undefined;
}
