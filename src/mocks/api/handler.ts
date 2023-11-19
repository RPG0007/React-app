import { HttpResponse, graphql, http } from 'msw';
import { mockCards } from '../mockData';

const jsonPlaceHolder = graphql.link('https://jsonplaceholder.ir/graphql');

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character/', () => {
    return HttpResponse.json(mockCards, { status: 200 });
  }),

  http.get('https://rickandmortyapi.com/api/character/1', () => {
    return HttpResponse.json(mockCards[0], { status: 200 });
  }),

  jsonPlaceHolder.query('posts', () => {
    return HttpResponse.json({
      data: { mockCards },
    });
  }),
];
