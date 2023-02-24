import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import GroupScreen from '../screens/JoinGroupScreen';
import MessageScreen from '../screens/MessageScreen';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import LoadingScreen from '../screens/LoadingScreen';
import {logout, updateUserId} from '../store/authSlice';

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    if (user) dispatch(updateUserId(user?.uid));
    else dispatch(logout());
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    setInitializing(false);
  }, [user]);

  console.log('user main', user);

  if (initializing) return <LoadingScreen />;
  return (
    <NavigationContainer>
      {user && user !== null ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
