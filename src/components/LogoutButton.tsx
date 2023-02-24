import React from 'react';
import {Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '../store/authSlice';
import auth from '@react-native-firebase/auth';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    auth().signOut();
    dispatch(logout);
  };

  return <Button title="Logout" onPress={handleLogout} />;
};

export default LogoutButton;
