import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import GroupScreen from '../screens/GroupScreen';
import MessageScreen from '../screens/MessageScreen';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import LoadingScreen from '../screens/LoadingScreen';
import {updateUserId} from '../store/authSlice';

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    console.log('user?:', user);
    if (user) dispatch(updateUserId(user?.uid));
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    setInitializing(false);
  }, [user]);

  if (initializing) return <LoadingScreen />;
  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
