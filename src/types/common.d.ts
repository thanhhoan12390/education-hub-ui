import type { StaticImageData } from 'next/image';

export interface RouteInformation {
    path: string;
    component: () => React.ReactElement;
    layout?: (({ children }: { children: React.ReactElement }) => React.ReactElement) | null;
}

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
    ratingCount: string;
    price: string;
}

export interface ListParams {
    offset?: number;
    limit?: number;

    [key: string]: any;
}
