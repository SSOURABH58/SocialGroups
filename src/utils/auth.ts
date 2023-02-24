import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const login = async (email: string, password: string) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    const userDoc = await firestore()
      .collection('users')
      .doc(response.user?.uid)
      .get();
    const userData = userDoc.data();
    const profile = {
      displayName: userData?.displayName,
      email: userData?.email,
      groups: userData?.groups,
    };
    return {profile, uid: response.user?.uid};
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (
  email: string,
  password: string,
  displayName: string,
  groups: string[] = [],
) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = response.user;
    await user?.updateProfile({displayName});
    const profile = {
      displayName,
      email,
      groups,
    };
    await firestore().collection('users').doc(user?.uid).set(profile);
    return {profile, uid: user?.uid};
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};
