import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { store } from 'store';
import history from './memoryTestHistory';

export function renderApp(children, initialData = {}) {
  const { initialReduxState = {}, initialRoute } = initialData;
  store.dispatch({
    type: 'tests/SET_STATE',
    payload: {
      initialState: initialReduxState,
    },
  });

  if (initialRoute) {
    history.push(initialRoute);
  }
  const ui = render(
    <Provider store={store}>
      <div id="app">
        <Router history={history}>{children}</Router>
      </div>

      <div id="react-root"></div>
    </Provider>,
  );

  return {
    store,
    ui,
    history,
  };
}
