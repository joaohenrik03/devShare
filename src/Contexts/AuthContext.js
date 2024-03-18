import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

export function AuthContextProvider({children}) {
  const [user, setUser] = useState(null);

  const [authLoading, setAuthLoading] = useState(false);
  const [fullLoading, setFullLoading] = useState(false);

  useEffect(() => {
    setFullLoading(true);
    
    async function getUserInLocalStorage() {
      const response = await AsyncStorage.getItem('@devShare-1.0.0');
    
      if (response) {
        setUser(JSON.parse(response))  
      }

      setFullLoading(false);
    }

    getUserInLocalStorage();
  }, []);

  async function onSignUp(name, email, password) {
    setAuthLoading(true);

    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (snapshot) => {

        const uid = snapshot.user.uid;
        
        await firestore()
          .collection('users')
          .doc(uid)
          .set({
            name: name,
            createdAt: new Date(),
          })
          .then(() => {

            const userData = {
              uid,
              name,
              email,
            }

            setUser(userData);
            setUserInLocalStorage(userData);
            setAuthLoading(false);
          })
          .catch((error) => {
            console.log(error);
            alert(error);
            setAuthLoading(false);
          })

      })
      .catch((error) => {
        console.log(error);
      })
  }

  async function onSignIn(email, password) {
    setAuthLoading(true);

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (snapshot) => {
        const uid = snapshot.user.uid;

        await firestore()
          .collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {

            const userData = {
              uid,
              name: snapshot.data().name,
              email,
            }

            setUser(userData);
            setUserInLocalStorage(userData);
            setAuthLoading(false);
          })
          .catch((error) => {
            console.log(error);
            alert(error);
            setAuthLoading(false);
          })

      })
      .catch((error) => {
        console.log(error);
      })
  }

  async function onSignOut() {
    setFullLoading(true);

    try {
      await AsyncStorage.clear();
      setUser(null);

      setFullLoading(false);
    } catch (error) {
      console.log(error);
      setFullLoading(false);
    }
  }

  async function setUserInLocalStorage(userData) {
    await AsyncStorage.setItem('@devShare-1.0.0', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{
      user,
      authLoading,
      fullLoading,
      onSignUp,
      onSignIn,
      onSignOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}
