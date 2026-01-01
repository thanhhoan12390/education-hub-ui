import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { searchApiSlice } from '~/lib/features/search/searchApiSlice';
import { courseApiSlice } from '~/lib/features/course/courseApiSlice';

const rootReducer = combineSlices(searchApiSlice, courseApiSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(searchApiSlice.middleware, courseApiSlice.middleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
