import { useCallback, useContext, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from "../../Contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { Header } from "../../components/Header";
import { Post } from "./components/Post";
import { LinkToSearch } from "./components/LinkToSearch/LinkToSearch";
import { HomeContainer, PostList } from "./styles";

export function Home() {
  const {user} = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [emptyList, setEmptyList] = useState(false);
  const [loading, setLoading] = useState(false);

  // fetchPosts function is here
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchPosts() {
        setLoading(true);

        await firestore()
          .collection('posts')
          .orderBy('created', 'desc')
          .limit(5)
          .get()
          .then((snapshot) => {
            if (isActive) {
              setPosts([]);
              let tempPosts = [];

              snapshot.docs.map((post) => {
                tempPosts.push({
                  ...post.data(),
                  id: post.id
                }); 
              });

              setEmptyList(Boolean(snapshot.empty))
              setPosts(tempPosts);
              setLoading(false);
            }
          })
          .catch(((error) => {
            console.log(error);
            setLoading(false);
          }))
      }

      fetchPosts();

      return () => isActive = false;
    }, [])
  );

  return (
    <HomeContainer>
      <Header />

      <PostList
        data={posts}
        keyExtractor={(post) => post.id}
        renderItem={(dataPost) => <Post data={dataPost.item} userId={user.uid} />}
      />

      <LinkToSearch />
    </HomeContainer>
  )
}
