import { createApi } from '@reduxjs/toolkit/query/react';
//import axios from 'axios';

//const fetch = axios.create();

const errorMessageFor404 = 'Request failed with status code 404';

const mockApi = ({ minDelay = 200, response = {}, shouldReject }) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => (shouldReject ? reject : resolve)(response),
      minDelay + Math.random() * 1000,
    );
  });
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (requestOpts, { getState }) => {
    try {
      //params is for params in a GET call
      //data is for payload in a POST call
      const {
        method,
        url,
        params = {},
        data = {},
        massage,
        basic,
      } = requestOpts;

      //const result = await axios.get(url);
      //const result = await mockApi({ response: { data: { name: 'Prabhas' } } });
      const result = await fetch(url).then((response) => response.json());

      return { data: result };
      //
    } catch (error) {
      if (error.message === errorMessageFor404) {
        return {
          error: {
            message: errorMessageFor404,
          },
        };
      } else return { error };
    }
  },
  tagTypes: ['star_wars_people'],
  endpoints: (builder) => ({
    getPeople: builder.query({
      query: () => ({
        url: 'http://swapi.dev/api/planets/1/',
        method: 'GET',
        basic: true,
      }),
    }),
  }),
});

export const { useGetPeopleQuery } = apiSlice;
