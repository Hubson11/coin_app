import * as constants from '../../constants';
import fetch from 'isomorphic-fetch';

export function getNoteboxStart() {
    return {
        type: constants.GET_NOTEBOX_START,
    }
}

export function getNoteboxSuccess(data) {
    return {
        payload: {
            data
        },
        type: constants.GET_NOTEBOX_SUCCESS,
    }
}

export function getNoteboxError(error) {
    return {
        payload: {
            error
        },
        type: constants.GET_NOTEBOX_ERROR,
    }
}

export function getExchangesSuccess(data) {
    return {
        payload: {
            data
        },
        type: constants.GET_EXCHANGES_SUCCESS,
    }
}

export function getExchanges() {
    return (dispatch) => {
        dispatch(getNoteboxStart());
    
        fetch(constants.proxyUrl + constants.targetUrl + 'exchanges/binance/markets', {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
              Accept: 'application/json',
            }})
            .then(blob => blob.json())
            .then(data => {
                dispatch(getExchangesSuccess(data))
            })
            .catch(e => {
                dispatch(getNoteboxError(e))
                console.log(e);
                return e;
           })
    }
}

export function getNotebox() {
    return (dispatch) => {
        dispatch(getNoteboxStart());
        fetch(constants.proxyUrl + constants.targetUrl + 'coins', {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
              Accept: 'application/json',
            }})
            .then(blob => blob.json())
            .then(data => {
                dispatch(getNoteboxSuccess(data))
            })
            .catch(e => {
                dispatch(getNoteboxError(e))
                console.log(e);
                return e;
           })
    }
}
