'use client';

import { useAppSelector } from '~/lib/hooks';

import { courseApiSlice } from '~/lib/features/course/courseApiSlice';
import { useCourseParams } from './useCourseParams';

export const useCoursesStatus = () => {
    const params = useCourseParams();

    const selectCoursesResult = courseApiSlice.endpoints.getCourses.select(params);

    const { isError, isLoading, error } = useAppSelector(selectCoursesResult);

    return { isError, isLoading, error };
};
