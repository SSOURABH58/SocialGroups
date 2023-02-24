import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JoinGroupScreen from '../screens/JoinGroupScreen';
import ChatScreen from '../screens/ChatScreen';
import LogoutButton from '../components/LogoutButton';
// import CreateGroupScreen from '../screens/CreateGroupScreen';
// import JoinGroupScreen from '../screens/JoinGroupScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => <LogoutButton />,
        }}
      />
      <Stack.Screen name="JoinGroup" component={JoinGroupScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
