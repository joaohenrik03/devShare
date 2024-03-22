import { useCallback, useLayoutEffect, useState } from "react";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { Post } from "../../components/Post";
import { PostList, PostsUserContainer } from "./styles";

export function PostsUser() {
  const route = useRoute();
  const navigation = useNavigation();

  const [author, setAuthor] = useState(route.params.title);
  const userId = route.params.userId;
  const [userPosts, setUserPosts] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: author
    })
  }, [navigation, author]);

  useFocusEffect(
    useCallback(() => {
        let isActive = true;

        firestore()
          .collection('posts')
          .where('userId', '==', userId)
          .orderBy('created', 'desc')
          .get()
          .then((snapshot) => {
            const tempList = [];

            snapshot.docs.map((post) => {
              tempList.push({
                ...post.data(),
                id: post.id
              })
            });

            setUserPosts(tempList);
          })
          .catch((error) => {
            console.log(error)
          });

          return () => isActive = false;
    }, [])
  );       

  return (
    <PostsUserContainer>
      <PostList 
        data={userPosts}
        keyExtractor={(item) => item.id}   
        renderItem={({item}) => <Post data={item} userId={userId} />}
        showsVerticalScrollIndicator={false}
      />
    </PostsUserContainer>
  )
}
