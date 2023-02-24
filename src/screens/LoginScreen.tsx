import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import InputField from '../components/InputField';
import Button from '../components/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {loginUser} from './../store/authSlice';
import {AppDispatch} from '../store/store';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = () => {
    dispatch(loginUser({email, password}));
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
          onPress={() => navigation.navigate('Signup')}>
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
