import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import JoinGroupScreen from '../screens/JoinGroupScreen';
import ChatScreen from '../screens/ChatScreen';
import LogoutButton from '../components/LogoutButton';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {theme} from '../utils/theme';
// import CreateGroupScreen from '../screens/CreateGroupScreen';
// import JoinGroupScreen from '../screens/JoinGroupScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const isDarkTheme = useSelector((state: RootState) => state.theme.darkMode);
  const colors = theme(isDarkTheme);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.ackcolor},
        headerTitleStyle: {color: colors.primcolor},
      }}>
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
