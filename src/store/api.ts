import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/constants';
import { ICardDescription, IResponseApi } from '../types/interfaces';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getResultNewSearch: builder.query<IResponseApi, string>({
      query: (queryString) => `${queryString}`,
    }),
    getCardDesctiption: builder.query<ICardDescription, string>({
      query: (queryString) => `${queryString}`,
    }),
  }),
});

export const { useGetResultNewSearchQuery, useLazyGetCardDesctiptionQuery } =
  rickAndMortyApi;
