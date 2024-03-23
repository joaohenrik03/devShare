import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { 
  ListUser,
  ListUserText,
  SearchContainer, 
  SearchInput, 
  SearchInputContainer, 
  UsersList
} from "./styles";

export function Search() {
  const { navigate } = useNavigation();
  const [users, setUsers] = useState([]);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    if (textInput.trim() === '') {
      setUsers([]);
      return;
    }

    const search = firestore()
      .collection('users')
      .where('name', '>=', textInput)
      .where('name', '<=', textInput + '\uf8ff')
      .onSnapshot((snapshot) => {
        const tempList = [];

        snapshot.forEach((user) => {
          tempList.push({
            ...user.data(),
            id: user.id
          });
        });
 
        setUsers(tempList);
      });

    return () => search();
  }, [textInput, setUsers]);

  return (
    <SearchContainer>
      <SearchInputContainer>
        <Feather name='search' size={24} color={"#E52246"}/>

        <SearchInput
          placeholder='Procure pelo nome do usuário'
          value={textInput}
          onChangeText={((text) => setTextInput(text))}
          placeholderTextColor={'#DDD'}
        />
      </SearchInputContainer>

      <UsersList
        data={users}
        keyExtractor={(user) => user.id}
        renderItem={({item}) => (
          <ListUser onPress={() => navigate('PostsUser', { title: item.name, userId: item.id })}>
            <ListUserText numberOfLines={1}>{item.name}</ListUserText>
          </ListUser>
        )}
      />
    </SearchContainer>
  )
}
