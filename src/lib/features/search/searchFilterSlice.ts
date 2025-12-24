import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Language = 'en' | 'es' | 'tr' | 'pt' | 'ar';
type Level = 'all' | 'beginner' | 'intermediate' | 'expert';
type Rating = 4.5 | 4 | 3.5 | 3;

export interface SearchFilterSliceState {
    hasExercises: boolean;
    hasPracticeTest: boolean;
    languages?: Language[];
    rating?: Rating;
    level?: Level[];
}

const initialState: SearchFilterSliceState = {
    hasExercises: false,
    hasPracticeTest: false,
    languages: [],
    level: [],
};

export const searchFilterSlice = createSlice({
    name: 'searchFilter',
    initialState,
    reducers: (create) => ({
        toggleExercises: create.reducer((state) => {
            state.hasExercises = !state.hasExercises;
        }),
        togglePracticeTest: create.reducer((state) => {
            state.hasPracticeTest = !state.hasPracticeTest;
        }),
        addLanguage: create.reducer((state, action: PayloadAction<Language>) => {
            state.languages?.push(action.payload);
        }),
        setRating: create.reducer((state, action: PayloadAction<Rating>) => {
            state.rating = action.payload;
        }),
        addLevel: create.reducer((state, action: PayloadAction<Level>) => {
            state.level?.push(action.payload);
        }),
    }),
    selectors: {
        selectHasExercises: (searchFilter) => searchFilter.hasExercises,
        selectHasPracticeTest: (searchFilter) => searchFilter.hasPracticeTest,
        selectLanguages: (searchFilter) => searchFilter.languages,
        selectRating: (searchFilter) => searchFilter.rating,
        selectLevel: (searchFilter) => searchFilter.level,
    },
});

export const { addLanguage, addLevel, setRating, toggleExercises, togglePracticeTest } = searchFilterSlice.actions;

export const { selectHasExercises, selectHasPracticeTest, selectLanguages, selectLevel, selectRating } =
    searchFilterSlice.selectors;
