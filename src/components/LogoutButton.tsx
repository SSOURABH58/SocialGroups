import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

const LogoutButton = () => {
  const handleLogout = () => {
    auth().signOut();
  };

  return (
    <Pressable style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.label}>LogOut</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  logoutButton: {},
  label: {
    color: '#F48484',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default LogoutButton;
