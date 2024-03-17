import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Router() {
  const {connected} = useContext(AuthContext);

  return (
    connected ? <AppRoutes />  : <AuthRoutes />
  )
}
