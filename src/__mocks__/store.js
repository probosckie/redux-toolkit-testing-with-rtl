import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducers from '../reducers';
import { apiSlice } from '../apiSlice';

console.log('mock store being used');

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export { store };
