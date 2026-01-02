'use client';

import { useSearchParams } from 'next/navigation';

import { Language, Level, Rating } from '~/components/features/search/SearchFiltersBar/SearchFiltersBar';

export const useCourseParams = () => {
    const searchParams = useSearchParams();

    return {
        language: searchParams.getAll('language') as Language[],
        level: searchParams.getAll('level') as Level[],
        rating: Number(searchParams.get('rating')) as Rating,
        hasExercises: searchParams.get('hasExercises') === 'true' || undefined,
        hasPracticeTest: searchParams.get('hasPracticeTest') === 'true' || undefined,
    };
};
