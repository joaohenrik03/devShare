import styled from "styled-components/native";

export const PostContainer = styled.View`
  background-color: #FFF;
  box-shadow: 1px 1px 3px rgba(18, 18, 18, 0.2);
  margin: 8px 2%;
  padding: 8px;
`;

export const PostHeader = styled.View`
  flex-direction: row;
  gap: 12px;
  align-items: center;
  justify-content: flex-start;
`;

export const Avatar = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 99px;
`;

export const PostAuthor = styled.Text`
  font-size: 18px;
  color: #353840;
  font-weight: bold;
`;

export const PostContent = styled.View`
  margin-top: 8px;
  margin-bottom: 12px;
`;

export const PostText = styled.Text`
  font-size: 14px;
  color: #222227;
`;

export const PostFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LikeButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const LikeText = styled.Text`
  color: #e52246;
  font-size: 16px;
`;

export const TimePost = styled.Text`
  color: #222227;
`;
