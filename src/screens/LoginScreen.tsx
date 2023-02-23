import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/authSlice';
import InputField from '../components/InputField';
import Button from '../components/Button';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const navigation = useNavigation();
  //   const dispatch = useDispatch();

  const handleLogin = () => {
    // dispatch(login({ email, password }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <InputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button label="Log in" onPress={handleLogin} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <Text
          style={styles.footerLink}
          //   onPress={() => navigation.navigate('Signup')}
        >
          Sign up
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: '#999',
  },
  footerLink: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default LoginScreen;