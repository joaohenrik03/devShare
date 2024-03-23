import { useContext, useEffect, useState } from "react";
import { Modal, Platform } from "react-native";
import { AuthContext } from "../../Contexts/AuthContext";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import { Header } from "../../components/Header";
import { StartLoading } from "../../components/StartLoading";
import { 
  BackButton, 
  Button, 
  ButtonText, 
  UserEmailText, 
  Input, 
  ModalContainer, 
  UserNameText, 
  ProfileContainer, 
  UploadImageButton, 
  UploadImageText, 
  UserAvatar 
} from "./styles";

export function Profile() {
  const { 
    onSignOut, 
    fullLoading, 
    user, 
    setUser, 
    setUserInLocalStorage 
  } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newNameText, setNewNameText] = useState('');

  useEffect(() => {
    let isActive = true;

    async function getAvatar() {
      try {
        if (isActive) {
          const response = await storage()
            .ref('users')
            .child(user.uid)
            .getDownloadURL();

          setAvatarUrl(response);
        }
      } catch {
        setAvatarUrl(null);
      }
    }

    getAvatar();
  }, []);

  function handleSignOut() {
    onSignOut();
  }

  function handleUpdatePhotoProfile() {
    const option = {
      noData: true,
      mediaType: 'photo'
    }

    launchImageLibrary(option, (response) => {
      if(response.didCancel) {
        setAvatarUrl(null);
        return;
      } else if(response.error) {
        console.log(response.error)
      } else {
        onUpdatePhotoProfile(response)
          .then(() => {
            uploadAvatarPosts();
          })

        setAvatarUrl(response.assets[0].uri);
      }
    });
  } 

  async function onUpdatePhotoProfile(response) {
    const fileSource = response.assets[0].uri;

    const storageRef = storage()
      .ref('users')
      .child(user.uid);

    return await storageRef.putFile(fileSource);
  }

  async function uploadAvatarPosts() {
    const storageRef = storage()
      .ref('users')
      .child(user.uid);

    await storageRef
      .getDownloadURL()
      .then(async (urlImage) => {
        const postDoc = await firestore()
          .collection('posts')
          .where('userId', '==', user.uid)
          .get();

        postDoc.forEach(async (post) => {
          await firestore().collection('posts').doc(post.id).update({
            avatarUrl: urlImage
          })
        });
      })
  }

  async function handleUpdateProfile() {
    if (newNameText.trim() === '') {
      return;
    }

    await firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        name: newNameText
      });

    const userPosts = await firestore()
      .collection('posts')
      .where('userId', '==', user.uid)
      .get()

    userPosts.forEach(async (doc) => {
      await firestore()
        .collection('posts')
        .doc(doc.id)
        .update({
          author: newNameText
        });
    });

    let tempUser = {
      uid: user.uid,
      name: newNameText,
      email: user.email
    };

    setNewNameText('');
    setUser(tempUser);
    setUserInLocalStorage(tempUser);
    setModalIsOpen(false);
  }

  if (fullLoading) {
    return (
      <StartLoading />   
    )
  }

  return (
    <ProfileContainer>
      <Header />

      {avatarUrl ? (
        <UploadImageButton onPress={handleUpdatePhotoProfile}>        
          <UploadImageText>+</UploadImageText>

          <UserAvatar
            source={{ uri: avatarUrl }}
          />
        </UploadImageButton>
      ) : (
        <UploadImageButton onPress={handleUpdatePhotoProfile}>
          <UploadImageText>+</UploadImageText>
        </UploadImageButton>
      )}

      <UserNameText>{user.name}</UserNameText>

      <UserEmailText>{user.email}</UserEmailText>

      <Button bg="#428cfd" onPress={() => setModalIsOpen(true)}>
        <ButtonText color="#fff">
          Atualizar Perfil
        </ButtonText>
      </Button>

      <Button bg="#ddd" onPress={handleSignOut}>
        <ButtonText color="#353840">
          Sair
        </ButtonText>
      </Button>

      <Modal visible={modalIsOpen} animationType='slide' transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
          <BackButton onPress={() => setModalIsOpen(false)}>
            <Feather name="arrow-left" size={24} color="#121212" />

            <ButtonText color="#121212">
              Voltar
            </ButtonText>
          </BackButton>

          <Input
            placeholder={user.name}
            value={newNameText}
            onChangeText={(text) => setNewNameText(text)}
          />

          <Button bg="#428cfd" onPress={handleUpdateProfile}>
            <ButtonText color="#fff">
              Atualizar
            </ButtonText>
          </Button>
        </ModalContainer>
      </Modal>
    </ProfileContainer>
  )
}
