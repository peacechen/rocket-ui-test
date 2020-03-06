import { ACTIONS } from '../actions/Launches';

const initialState = {
  launches: [],
  fetching: false,
  error: false,
  errorMessage: '',
  complete: false,
};

const actionHandlers = {
  [ACTIONS.REQUEST_LAUNCHES]: ({ state }) => ({
    ...state,
    fetching: true
  }),
  [ACTIONS.RECEIVE_LAUNCHES]: ({ state, action }) => ({
    ...state,
    fetching: false,
    complete: true,
    error: action.payload.error,
    errorMessage: action.payload.errorMessage,
    launches: [...state.launches, ...action.payload.launches]
  })
};

export default (state = initialState, action) =>
  actionHandlers[action.type] ? actionHandlers[action.type]({ state, action }) : state;
