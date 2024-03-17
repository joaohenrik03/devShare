import { createContext, useState } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext({});

export function AuthContextProvider({children}) {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

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
            setConnected(true);
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
            setConnected(true);
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

  return (
    <AuthContext.Provider value={{
      connected,
      user,
      authLoading,
      onSignUp,
      onSignIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}
