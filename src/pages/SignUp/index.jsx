import { useState } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather'
import { 
  SingUpContainer, 
  Title, 
  Slogan, 
  InputsContainer, 
  Input, 
  SignInButton, 
  SignInButtonText, 
  SingOutButton, 
  SingOutButtonText,
  BackButton
} from "./styles";

export function SignUp() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SingUpContainer>
      <Title>
        Dev<Text style={{color: '#00B37E'}}>Share</Text>
      </Title>
      
      <Slogan>
        Crie sua conta
      </Slogan>

      <InputsContainer>
        <Input 
          placeholder="Seu nome" 
          value={name} 
          onChangeText={(text) => setName(text)} 
          placeholderTextColor={"#78746D"}
        />
        <Input 
          placeholder="Seu email" 
          value={email} 
          onChangeText={(text) => setEmail(text)} 
          placeholderTextColor={"#78746D"}
        />
        <Input 
          placeholder="Sua senha" 
          value={password} 
          onChangeText={(text) => setPassword(text)} 
          secureTextEntry={true}
          placeholderTextColor={"#78746D"}
        />

        <SignInButton 
          onPress={() => console.log('Fazer login')}
          activeOpacity={0.8}
        >
          <SignInButtonText>
            Cadastrar
          </SignInButtonText>
        </SignInButton>

        <SingOutButton
          onPress={() => navigation.navigate('SignIn')}
        >
          <SingOutButtonText>
            Já possuo uma conta
          </SingOutButtonText>
        </SingOutButton>
      </InputsContainer>

      <BackButton
        onPress={() => navigation.goBack()}
        activeOpacity={0.9}
      >
        <Feather name="chevron-left" size={32} color="#fff" />
      </BackButton>
    </SingUpContainer>
  )
}
