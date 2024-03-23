import styled from "styled-components/native";

export const ProfileContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: #353840;
`;

export const UploadImageButton = styled.TouchableOpacity`
  margin-top: 20%;
  background-color: #fff;
  width: 165px;
  height: 165px;
  border-radius: 90px;
  align-items: center;
  justify-content: center;
  z-index: 9;
`;

export const UserAvatar = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
`;

export const UploadImageText = styled.Text`
  font-size: 54px;
  position: absolute;
  color: #e52246;
  opacity: 0.4;
  z-index: 99;
`;

export const UserNameText = styled.Text`
  margin: 20px 20px 0 20px;
  font-size: 28px;
  font-weight: bold;
  color: #FFF;
`;

export const UserEmailText = styled.Text`
  color: #fff;
  margin: 10px 20px 0 20px;
  font-size: 20px;
  font-style: italic;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 16px;
  background-color: ${props => props.bg};
  width: 80%;
  height: 50px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: ${props => props.color};
`;

export const ModalContainer = styled.KeyboardAvoidingView` 
  width: 100%;
  height: 70%;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  left: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Input = styled.TextInput`
  background-color: #ddd;
  width: 80%;
  border-radius: 4px;
  padding: 10px;
  font-size: 18px;
  color: #121212;
  text-align: center;
`;
