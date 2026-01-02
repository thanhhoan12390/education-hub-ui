import { createApi } from '@reduxjs/toolkit/query/react';
import type { EndpointBuilder } from '@reduxjs/toolkit/query/react';

import type { MyBaseQueryFn } from '~/lib/features/createBaseQuery';
import { createBaseQuery } from '~/lib/features/createBaseQuery';
import { coursesEndpoints } from './coursesEndpoints/coursesEndpoints';

export type MyCourseBuilder = EndpointBuilder<MyBaseQueryFn, string | never, 'courseApi'>;

export const courseApiSlice = createApi({
    reducerPath: 'courseApi',
    baseQuery: createBaseQuery(),
    tagTypes: [],
    endpoints: (builder: MyCourseBuilder) => ({
        ...coursesEndpoints(builder),
    }),
});

export const { useGetCoursesQuery } = courseApiSlice;
