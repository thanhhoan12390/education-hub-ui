import { Course } from '~/types';
import type { MyCourseBuilder } from '../courseApiSlice';
import { Language, Level, Rating } from '~/components/features/search/SearchFiltersBar/SearchFiltersBar';

export const coursesEndpoints = (builder: MyCourseBuilder) => ({
    getCourses: builder.query<
        Course[],
        {
            language?: Language[];
            level?: Level[];
            rating?: Rating;
            hasExercises?: true | undefined;
            hasPracticeTest?: true | undefined;
            [key: string]: unknown;
        }
    >({
        query: (filters) => {
            const params = new URLSearchParams();

            filters.language?.forEach((lang) => params.append('lang', lang));
            filters.level?.forEach((level) => params.append('level', level));

            if (filters.rating) params.set('rating', String(filters.rating));
            if (filters.hasExercises) params.set('hasExercises', String(filters.hasExercises));
            if (filters.hasPracticeTest) params.set('hasPracticeTest', String(filters.hasPracticeTest));

            return {
                url: '/api/courses',
                method: 'GET',
                params,
            };
        },
    }),
});
