import { View, Text } from "react-native";
import { Header } from "../../components/Header";
import { HomeContainer } from "./styles";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

export function Home() {
  const {user} = useContext(AuthContext);

  return (
    <HomeContainer>
      <Header />

      <Text>{user.name}</Text>
    </HomeContainer>
  )
}
