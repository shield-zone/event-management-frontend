import { useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./authContext";
import { authReducer, initialState } from "./authReducer";

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
