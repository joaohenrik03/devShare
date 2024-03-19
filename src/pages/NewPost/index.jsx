import { useContext, useLayoutEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore'
import { NewPostContainer, NewPostInput, ShareButton, ShareText } from "./styles";

export function NewPost() {
  const navigation = useNavigation();

  const { user } = useContext(AuthContext);

  const [newPostText, setNewPostText] = useState('');
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <ShareButton
          activeOpacity={0.8}
          onPress={handleCreateNewPost}
        >
          <ShareText>
            {loading ? (
              <ActivityIndicator size={20} color={'#FFF'} />
            ) : (
              'Compartilhar'
            )}
          </ShareText>
        </ShareButton>   
      )
    });
  }, [navigation, newPostText]);

  async function handleCreateNewPost() {
    setLoading(true);

    if (newPostText.trim() === '') { 
      alert('Nada digitado!')
      return; 
    }

    let avatarUrl = null;

    try {
      let response = await storage().ref('users').child(user?.uid).getDownloadURL();

      avatarUrl = response;
    }catch(error) {
      avatarUrl = null;
    }

    await firestore()
      .collection('posts')
      .add({
        created: new Date(),
        content: newPostText,
        userId: user.uid,
        author: user.name,
        avatarUrl,
        likes: 0
      })
      .then(() => {
        setNewPostText('');
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      })

      navigation.goBack();
  }

  return (
    <NewPostContainer>
      <NewPostInput
        placeholder="O que está acontecendo?"
        maxLength={300}
        value={newPostText}
        onChangeText={(text) => setNewPostText(text)}
        multiline={true}
        placeholderTextColor={'#DDD'}
      />
    </NewPostContainer>
  )
}