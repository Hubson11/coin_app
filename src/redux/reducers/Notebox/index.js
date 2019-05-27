const initialState = {
    data: [],
    isLoading: false,
    error: null,
}

const dataReducer = (name) => {
    return (state = initialState, action) => {
      switch (action.type) {
        case `FETCH_${name}_STARTED`:
          return { 
              data: null, 
              isLoading: true, 
              error: null 
            };
        case `FETCH_${name}_SUCCESS`:
          return { 
              data: action.payload, 
              isLoading: false, 
              error: null 
            };
        case `FETCH_${name}_ERROR`:
          return { 
              data: null, 
              isLoading: false, 
              error: action.payload 
            };
        default:
          return state;
      }
    };
  };

  export const coins = dataReducer('COINS');
  export const markets = dataReducer('MARKETS');
