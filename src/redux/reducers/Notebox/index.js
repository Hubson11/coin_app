import * as actions from '../../constants';

const initialState = {
    infoData: [],
    exchangesData: [],
    isLoading: true,
    isError: false,
}

export function noteboxReducer(state = initialState, action) {
    switch(action.type) {
        case actions.GET_NOTEBOX_START:
            return {
                ...state,
                isLoading: true,
            }
        case actions.GET_NOTEBOX_SUCCESS:
            const dataTable = action.payload.data
            return { 
                ...state, 
                infoData: dataTable, 
                isLoading: false, 
            }
        case actions.GET_NOTEBOX_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case actions.GET_EXCHANGES_SUCCESS:
            const exchangesTable = action.payload.data
            return { 
                ...state, 
                exchangesData: exchangesTable, 
                isLoading: false, 
            }
        default:
            return state;
    }
}