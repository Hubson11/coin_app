import * as constants from '../../constants';
import fetch from 'isomorphic-fetch';

const getDataAction = (name, thunk) => () => {
    return dispatch => {
      dispatch({ type: `FETCH_${name}_STARTED` });
  
      return dispatch(thunk)
        .then(data => data.json())
        .then(json => dispatch({ type: `FETCH_${name}_SUCCESS`, payload: json }))
        .catch(err => dispatch({ type: `FETCH_${name}_ERROR`, payload: err }));
    };
  };

  export const fetchCoins = getDataAction(
    "COINS",
    (dispatch, getState) => {
      return fetch(
          constants.proxyUrl + constants.targetUrl + 'coins'
      );
    }
  );

  export const fetchMarkets = getDataAction(
    "MARKETS",
    (dispatch, getState) => {
      return fetch(
          constants.proxyUrl + constants.targetUrl + 'exchanges/binance/markets'
      );
    }
  );