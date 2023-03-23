import React, { useReducer } from "react";
import { AuthContext } from "./authContext";
import { authReducer, initialState } from "./authReducer";

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
