import Cookies from "js-cookie";

const user = Cookies.get("user");

export const initialState = {
  isAuthenticated: user ? true : false,
  user: user || null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
