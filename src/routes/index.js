import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Router() {
  const connected = false;

  return (
    connected ? <AppRoutes />  : <AuthRoutes />
  )
}
