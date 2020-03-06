import LaunchService from '../services/LaunchService';

export const ACTIONS = {
  REQUEST_LAUNCHES: 'REQUEST_LAUNCHES',
  RECEIVE_LAUNCHES: 'RECEIVE_LAUNCHES'
};

export const requestLaunches = () => ({
  type: ACTIONS.REQUEST_LAUNCHES
});

const receiveLaunches = response => ({
  type: ACTIONS.RECEIVE_LAUNCHES,
  payload: {
    launches: response.data
  }
});

const receiveLaunchesError = error => {
  return ({
  type: ACTIONS.RECEIVE_LAUNCHES,
  payload: {
    error: true,
    errorMessage: error.response.data,
    launches: [],
  }
})};

export const fetchLaunches = dispatch => {
  dispatch(requestLaunches());
  return LaunchService.get()
    .then(response => dispatch(receiveLaunches(response)))
    .catch(error => dispatch(receiveLaunchesError(error)));
};

const shouldFetchLaunches = launchCollection => !launchCollection.complete && !launchCollection.fetching;

export const fetchLaunchesIfNeeded = ({ dispatch, launchCollection }) =>
  shouldFetchLaunches(launchCollection) && fetchLaunches(dispatch);
