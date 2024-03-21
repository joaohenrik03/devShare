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
  const [lastPost, setLastPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingRefresh, setLoadingRefresh] = useState(false);

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

              setEmptyList(Boolean(snapshot.empty));
              setLastPost(snapshot.docs[snapshot.docs.length - 1]);
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

  async function handleRefreshPosts() {
    setLoadingRefresh(true);

    await firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .get()
      .then((snapshot) => {
        const tempPosts = [];
        setPosts([]);

        snapshot.docs.map((item) => {
          tempPosts.push({
            ...item.data(),
            id: item.id
          })
        });

        setEmptyList(false);
        setPosts(tempPosts);
        setLastPost(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })

    setLoadingRefresh(false);
  }

  async function handleGetNewPostsList() {
    if (emptyList) {
      setLoading(false);
      return;
    };

    if (loading) {
      return;
    };

    await firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .startAfter(lastPost)
      .get()
      .then((snapshot) => {
        let tempPosts = [];

        snapshot.docs.map((item) => {
          tempPosts.push({
            ...item.data(),
            id: item.id
          });
        });

        setEmptyList(Boolean(snapshot.empty));
        setLastPost(snapshot.docs[snapshot.docs.length - 1]);
        setPosts((oldValue) => [...oldValue, ...tempPosts]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <HomeContainer>
      <Header />

      <PostList
        data={posts}
        keyExtractor={(post) => post.id}
        renderItem={(dataPost) => <Post data={dataPost.item} userId={user.uid} />}
        onRefresh={handleRefreshPosts}
        refreshing={loadingRefresh}
        onEndReached={handleGetNewPostsList}
        showsVerticalScrollIndicator={false}
      />

      <LinkToSearch />
    </HomeContainer>
  )
}
