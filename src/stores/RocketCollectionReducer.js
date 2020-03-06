import { ACTIONS } from '../actions/Rockets';

const initialState = {
  rockets: [],
  fetching: false,
  error: false,
  errorMessage: '',
  complete: false,
};

const actionHandlers = {
  [ACTIONS.REQUEST_ROCKETS]: ({ state }) => ({
    ...state,
    fetching: true
  }),
  [ACTIONS.RECEIVE_ROCKETS]: ({ state, action }) => ({
    ...state,
    fetching: false,
    complete: true,
    error: action.payload.error,
    errorMessage: action.payload.errorMessage,
    rockets: [...state.rockets, ...action.payload.rockets]
  })
};

export default (state = initialState, action) =>
  actionHandlers[action.type] ? actionHandlers[action.type]({ state, action }) : state;
