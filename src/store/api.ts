import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { IResponseApi } from '../types/interfaces';
//import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getResultNewSearch: builder.query<IResponseApi, string>({
      query: (queryString) => `${queryString}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetResultNewSearchQuery } = rickAndMortyApi;
