import auth from '@react-native-firebase/auth';

export const login = async (email: string, password: string) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    return response.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signup = async (
  email: string,
  password: string,
  displayName: string,
) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    await response.user?.updateProfile({displayName});
    return response.user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};
