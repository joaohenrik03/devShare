import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
  Avatar, 
  LikeButton, 
  LikeText, 
  PostAuthor, 
  PostContainer,
  PostContent, 
  PostFooter, 
  PostHeader, 
  PostText, 
  TimePost 
} from "./styles";

export function Post({data, userId}) {
  const { navigate } = useNavigation();

  const [likesPost, setLikesPost] = useState(data.likes);

  const defaultAvatarUrl = require('../../assets/avatar.png');

  const dateFormatted = () => {
    const datePost = data.created.seconds * 1000;

    return formatDistance(new Date(), datePost, { locale: ptBR });
  };
  
  async function handleLikePost(id, likes) {
    const docId = `${userId}_${id}`;

    const doc = await firestore()
      .collection('likes')
      .doc(docId)
      .get();

    if(doc.exists) {
      await firestore()
        .collection('posts')
        .doc(id)
        .update({
          likes: likes - 1
        });

      await firestore()
        .collection('likes')
        .doc(docId)
        .delete()
        .then(() => {
          setLikesPost(oldValue => oldValue - 1);
        });

      return;
    };

    await firestore()
      .collection('likes')
      .doc(docId)
      .set({
        postId: id,
        userId,
      });

    await firestore()
      .collection('posts')
      .doc(id)
      .update({
        likes: likes + 1
      })
      .then(() => {
        setLikesPost(oldValue => oldValue + 1);
      });
  };

  return (
    <PostContainer>
      <PostHeader onPress={() => navigate('PostsUser', { title: data.author, userId: userId })}>
        <Avatar source={data.avatarUrl ? {uri: data.avatarUrl} : defaultAvatarUrl} />

        <PostAuthor numberOfLines={1}>
          {data.author}
        </PostAuthor>
      </PostHeader>     

      <PostContent>
        <PostText>
          {data.content}
        </PostText>
      </PostContent>

      <PostFooter>
        <LikeButton onPress={() => handleLikePost(data.id, likesPost)}>
          {likesPost !== 0 && <LikeText>{likesPost}</LikeText>}

          <MaterialCommunity
            name={likesPost === 0 ? "heart-plus-outline" : "cards-heart"}
            size={20}
            color="#e52246"
          />
        </LikeButton>

        <TimePost>
          Há {dateFormatted()}
        </TimePost>
      </PostFooter>
    </PostContainer>
  )
}
