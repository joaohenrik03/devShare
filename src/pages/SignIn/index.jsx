import { useState } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { 
  SingInContainer, 
  Title, 
  Slogan, 
  InputsContainer, 
  Input, 
  SignInButton, 
  SignInButtonText, 
  SingOutButton, 
  SingOutButtonText
} from "./styles";

export function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SingInContainer>
      <Title>
        Dev<Text style={{color: '#00B37E'}}>Share</Text>
      </Title>
      
      <Slogan>
        Faça login usando e-mail e senha
      </Slogan>

      <InputsContainer>
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
            Acessar
          </SignInButtonText>
        </SignInButton>

        <SingOutButton
          onPress={() => navigation.navigate('SignUp')}
        >
          <SingOutButtonText>
            Criar uma nova conta
          </SingOutButtonText>
        </SingOutButton>
      </InputsContainer>
    </SingInContainer>
  )
}
