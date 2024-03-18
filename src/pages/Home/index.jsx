import { useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "../../Contexts/AuthContext";
import { Header } from "../../components/Header";
import { LinkToSearch } from "./components/LinkToSearch/LinkToSearch";
import { HomeContainer } from "./styles";

export function Home() {
  const {user} = useContext(AuthContext);

  return (
    <HomeContainer>
      <Header />

      <Text>{user.name}</Text>

      <LinkToSearch />
    </HomeContainer>
  )
}
