import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import GroupScreen from '../screens/GroupScreen';
import MessageScreen from '../screens/MessageScreen';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {false ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
