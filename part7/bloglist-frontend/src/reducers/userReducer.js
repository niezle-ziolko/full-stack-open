const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER': 
      return action.data;
    case 'LOGOUT':
      return null;
    default:
      return state;
  };
};

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT'
  };
};

export default userReducer;