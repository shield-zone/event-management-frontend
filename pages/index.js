import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Landing from "./Landing";
import { AuthContext } from "../service/authContext";

export default function Home() {
  const router = useRouter();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if(state.isAuthenticated) {
      router.push("/Event");
    }
  },[state.isAuthenticated])

  return (
    <div><Landing /></div>
  );
}
