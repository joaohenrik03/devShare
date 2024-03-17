import styled from "styled-components/native";

export const SingUpContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #323238;
`;

export const Title = styled.Text`
  font-size: 48px;  
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const Slogan = styled.Text`
  font-size: 14px;
  color: #C4C4CC;
`;

export const InputsContainer = styled.View`
  width: 100%;
  margin-top: 16px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Input = styled.TextInput`
  width: 90%;
  height: 52px;
  font-size: 14px;
  background-color: #fff;  
  border-radius: 12px;
  padding: 12px;
`;

export const SignInButton = styled.TouchableOpacity`
  width: 90%;
  height: 52px;
  background-color: #00B37E;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
`;

export const SignInButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

export const SingOutButton = styled.TouchableOpacity``;

export const SingOutButtonText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #C4C4CC;
`;

export const BackButton = styled.TouchableOpacity`
  background-color: #00B37E;
  border: 1px solid #fff;
  border-radius: 99px;
  position: absolute;
  top: 20px;
  left: 20px;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;