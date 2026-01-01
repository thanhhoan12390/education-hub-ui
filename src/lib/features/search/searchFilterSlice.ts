// import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

// export type Language = 'en' | 'es' | 'tr' | 'pt' | 'ar';
// export type Level = 'all' | 'beginner' | 'intermediate' | 'expert';
// export type Rating = 4.5 | 4 | 3.5 | 3;

// export interface SearchFilterSliceState {
//     hasExercises?: true;
//     hasPracticeTest?: true;
//     languages: Language[];
//     rating?: Rating;
//     level: Level[];
// }

// const initialState: SearchFilterSliceState = {
//     languages: [],
//     level: [],
// };

// export const searchFilterSlice = createSlice({
//     name: 'searchFilter',
//     initialState,
//     reducers: (create) => ({
//         toggleExercises: create.reducer((state) => {
//             state.hasExercises = !state.hasExercises || undefined;
//         }),
//         togglePracticeTest: create.reducer((state) => {
//             state.hasPracticeTest = !state.hasPracticeTest || undefined;
//         }),
//         addLanguage: create.reducer((state, action: PayloadAction<Language>) => {
//             state.languages.push(action.payload);
//         }),
//         removeLanguage: create.reducer((state, action: PayloadAction<Language>) => {
//             state.languages = state.languages.filter((item) => item !== action.payload);
//         }),
//         setLanguages: create.reducer((state, action: PayloadAction<Language[]>) => {
//             state.languages = action.payload;
//         }),
//         setRating: create.reducer((state, action: PayloadAction<Rating>) => {
//             state.rating = action.payload;
//         }),
//         clearRating: create.reducer((state) => {
//             state.rating = undefined;
//         }),
//         addLevel: create.reducer((state, action: PayloadAction<Level>) => {
//             state.level.push(action.payload);
//         }),
//         removeLevel: create.reducer((state, action: PayloadAction<Level>) => {
//             state.level = state.level.filter((item) => item !== action.payload);
//         }),
//         setLevels: create.reducer((state, action: PayloadAction<Level[]>) => {
//             state.level = action.payload;
//         }),
//     }),
//     selectors: {
//         selectHasExercises: (searchFilter) => searchFilter.hasExercises,
//         selectHasPracticeTest: (searchFilter) => searchFilter.hasPracticeTest,
//         selectLanguages: (searchFilter) => searchFilter.languages,
//         selectRating: (searchFilter) => searchFilter.rating,
//         selectLevel: (searchFilter) => searchFilter.level,
//     },
// });

// export const {
//     addLanguage,
//     addLevel,
//     setRating,
//     toggleExercises,
//     togglePracticeTest,
//     removeLanguage,
//     clearRating,
//     removeLevel,
//     setLanguages,
//     setLevels,
// } = searchFilterSlice.actions;

// export const { selectHasExercises, selectHasPracticeTest, selectLanguages, selectLevel, selectRating } =
//     searchFilterSlice.selectors;
