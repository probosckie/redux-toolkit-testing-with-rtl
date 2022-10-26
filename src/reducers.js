import { combineReducers } from 'redux';
import { apiSlice } from './apiSlice';
import summaryReducer from './duck';

const appReducer = combineReducers({
  summary: summaryReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const initialStateWithNullApi = {
  summary: {
    summary: null,
  },
  api: {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      online: true,
      focused: true,
      middlewareRegistered: true,
      refetchOnFocus: false,
      refetchOnReconnect: false,
      refetchOnMountOrArgChange: false,
      keepUnusedDataFor: 60,
      reducerPath: 'api',
    },
  },
};

const rootReducers = (state, action) => {
  if (action.type === 'tests/SET_STATE') {
    const initialState = action?.payload?.initialState || {};
    return appReducer({ ...initialStateWithNullApi, ...initialState }, action);
  }

  return appReducer(state, action);
};

export default rootReducers;
