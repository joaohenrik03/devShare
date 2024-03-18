import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { LinkToSearchContainer } from './styles';

export function LinkToSearch() {
  const { navigate } = useNavigation();

  return (
    <LinkToSearchContainer 
      onPress={() => navigate('NewPost')}
      activeOpacity={0.7}
    >
      <Feather name="edit-2" size={28} color="#FFF" />
    </LinkToSearchContainer>
  )
}
