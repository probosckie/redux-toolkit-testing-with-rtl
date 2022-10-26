import { screen } from '@testing-library/react';
import { renderApp } from './test-utils';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import App from './App';

export const handlers = [
  rest.get('http://swapi.dev/api/planets/1/', (req, res, ctx) => {
    return res(
      ctx.json({
        name: 'Tatooine',
        rotation_period: '23',
        orbital_period: '304',
        diameter: '10465',
        climate: 'arid',
        gravity: '1 standard',
        terrain: 'desert',
        surface_water: '1',
        population: '200000',
        residents: [
          'https://swapi.dev/api/people/1/',
          'https://swapi.dev/api/people/2/',
          'https://swapi.dev/api/people/4/',
          'https://swapi.dev/api/people/6/',
          'https://swapi.dev/api/people/7/',
          'https://swapi.dev/api/people/8/',
          'https://swapi.dev/api/people/9/',
          'https://swapi.dev/api/people/11/',
          'https://swapi.dev/api/people/43/',
          'https://swapi.dev/api/people/62/',
        ],
        films: [
          'https://swapi.dev/api/films/1/',
          'https://swapi.dev/api/films/3/',
          'https://swapi.dev/api/films/4/',
          'https://swapi.dev/api/films/5/',
          'https://swapi.dev/api/films/6/',
        ],
        created: '2014-12-09T13:50:49.641000Z',
        edited: '2014-12-20T20:58:18.411000Z',
        url: 'https://swapi.dev/api/planets/1/',
      }),
      ctx.delay(150),
    );
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('renders learn react link', async () => {
  //jest.useFakeTimers('modern');
  renderApp(<App />);
  const linkElement = screen.getByText(/loading data from api/i);
  expect(linkElement).toBeInTheDocument();
  expect(await screen.findByText(/Tatooine/i)).toBeInTheDocument();
});
