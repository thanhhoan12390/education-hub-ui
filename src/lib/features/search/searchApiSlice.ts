import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ListPokemon } from '~/types';

export const searchApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
    reducerPath: 'searchApi',
    tagTypes: ['Search'],
    endpoints: (build) => ({
        getPokemon: build.query<ListPokemon, { limit: number; offset: number }>({
            query: ({ limit, offset = 0 }) => `?limit=${limit}&offset=${offset}`,
            providesTags: (result, error, arg) => [{ type: 'Search', id: `${arg.limit}-${arg.offset}` }],
        }),
    }),
});

export const { useGetPokemonQuery } = searchApiSlice;
