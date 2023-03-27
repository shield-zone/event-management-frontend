import Cookies from "js-cookie";

const user = Cookies.get("user");
const userId = Cookies.get("userId");
const userName = Cookies.get("userName");

const getData = () => ({
  token: user,
  user: {
    userId: userId,
    userName: userName,
  },
});

export const initialState = {
  isAuthenticated: user ? true : false,
  user: user ? getData() : null,
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
