import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { searchFilterSlice } from '~/lib/features/search/searchFilterSlice';
import { searchApiSlice } from '~/lib/features/search/searchApiSlice';

const rootReducer = combineSlices(searchFilterSlice, searchApiSlice);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchApiSlice.middleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
