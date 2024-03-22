import styled from "styled-components/native";

export const SearchContainer = styled.SafeAreaView`
  flex: 1;
  padding: 18px;
  background-color: #353840;
`;

export const SearchInputContainer = styled.View`
  background-color: #FFF;
  border-radius: 8px;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  padding: 12px;
  margin-bottom: 20px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 18px;
  color: #444444;
`;

export const UsersList = styled.FlatList`
  flex: 1;
`;

export const ListUser = styled.TouchableOpacity`
  background-color: #222227;
  width: 100%;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

export const ListUserText = styled.Text`
  color: #FFF;
  font-size: 18px;
  max-lines: 1;
`;
