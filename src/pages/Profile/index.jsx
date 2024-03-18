import { Button } from "react-native";
import { Header } from "../../components/Header";
import { ProfileContainer } from "./styles";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { StartLoading } from "../../components/StartLoading";

export function Profile() {
  const { onSignOut, fullLoading } = useContext(AuthContext);

  function handleSignOut() {
    onSignOut();
  }

  if (fullLoading) {
    return (
      <StartLoading />   
    )
  }

  return (
    <ProfileContainer>
      <Header />

      <Button title="Sair" onPress={handleSignOut} />
    </ProfileContainer>
  )
}