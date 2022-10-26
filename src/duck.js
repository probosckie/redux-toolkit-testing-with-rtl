const initial = {
  summary: null,
};

const SET_SUMMARY = 'SET_SUMMARY';

export const setSummary = (payload) => {
  return {
    type: SET_SUMMARY,
    payload,
  };
};

export default function summaryReducer(state = initial, action) {
  const { payload, type } = action;
  switch (type) {
    case 'SET_SUMMARY':
      return { ...state, summary: payload.summary };
    default:
      return state;
  }
}
