import { useState } from 'react';
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
  const [likesPost, setLikesPost] = useState(data.likes);

  const defaultAvatarUrl = require('../../../../assets/avatar.png');

  return (
    <PostContainer>
      <PostHeader>
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
        <LikeButton onPress={() => {console.log('Like current post')}}>
          {likesPost !== 0 && <LikeText>{likesPost}</LikeText>}

          <MaterialCommunity
            name={likesPost === 0 ? "heart-plus-outline" : "cards-heart"}
            size={20}
            color="#e52246"
          />
        </LikeButton>

        <TimePost>
          Há 10 minutos
        </TimePost>
      </PostFooter>
    </PostContainer>
  )
}
