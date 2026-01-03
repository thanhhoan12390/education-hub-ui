import { FetchArgs } from '@reduxjs/toolkit/query';
import type { MyCourseBuilder } from '../courseApiSlice';
import { coursesEndpoints } from '../coursesEndpoints/coursesEndpoints';

describe('coursesEndpoints.getCourses', () => {
    const fakeBuilder: MyCourseBuilder = {
        query<ResultType, QueryArg, ExtraOptions, DefinitionExtraOptions, Meta>(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            definition: any, // ⬅️ KHÔNG implicit any vì TS biết generic rồi
        ) {
            return definition;
        },
    } as unknown as MyCourseBuilder;

    test('build params correctly', () => {
        const { getCourses } = coursesEndpoints(fakeBuilder);

        // TS biết chắc đây là FetchArgs
        const result = getCourses.query!({
            language: ['en', 'es'],
            level: ['beginner'],
            rating: 4,
            hasExercises: true,
            hasPracticeTest: true,
        }) as FetchArgs;

        expect(result.url).toBe('/api/courses');
        expect(result.method).toBe('GET');
        expect(result.params!.toString()).toBe(
            'lang=en&lang=es&level=beginner&rating=4&hasExercises=true&hasPracticeTest=true',
        );
    });

    test('empty filters → empty params', () => {
        const { getCourses } = coursesEndpoints(fakeBuilder);

        const result = getCourses.query!({}) as FetchArgs;

        expect(result.params!.toString()).toBe('');
    });

    test('ignores undefined scalar filters', () => {
        const { getCourses } = coursesEndpoints(fakeBuilder);

        const result = getCourses.query!({
            language: ['en'],
        }) as FetchArgs;

        expect(result.params!.toString()).toBe('lang=en');
    });
});
