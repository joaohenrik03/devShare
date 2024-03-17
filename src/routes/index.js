import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { StartLoading } from "../components/StartLoading";

export function Router() {
  const { user, fullLoading } = useContext(AuthContext);

  if (fullLoading) {
    return (
      <StartLoading />   
    )
  }

  return (
    user ? <AppRoutes />  : <AuthRoutes />
  )
}
