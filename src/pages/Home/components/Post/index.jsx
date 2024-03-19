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

export function Post() {
  const defaultAvatarUrl = require('../../../../assets/avatar.png');

  return (
    <PostContainer>
      <PostHeader>
        <Avatar source={defaultAvatarUrl} />

        <PostAuthor numberOfLines={1}>
          Nome
        </PostAuthor>
      </PostHeader>     

      <PostContent>
        <PostText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolore voluptatem soluta consequuntur, corrupti veniam temporibus deserunt nostrum facilis nulla optio provident corporis? Vitae quasi iure officiis debitis cupiditate aut?
        </PostText>
      </PostContent>

      <PostFooter>
        <LikeButton onPress={() => {console.log('Like current post')}}>
          <LikeText>1</LikeText>

          <MaterialCommunity
            name={true ? "heart-plus-outline" : "cards-heart"}
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
