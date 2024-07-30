// authReducer.js
export const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    carName: null,
  };
  
  export const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
        };
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          token: null,
        };
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
        };
      default:
        return state;
    }
  };
  