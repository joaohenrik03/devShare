import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContextProvider } from "./src/Contexts/AuthContext";
import { Router } from "./src/routes";

export function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Router />  
      </AuthContextProvider>
    </NavigationContainer>
  )
}
