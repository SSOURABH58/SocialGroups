import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import InputField from '../components/InputField';
import Button from '../components/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {loginUser} from './../store/authSlice';
import {AppDispatch} from '../store/store';
import ThemeText from '../components/ThemeText';
import ThemeView from '../components/ThemeView';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = () => {
    dispatch(loginUser({email, password}));
  };

  return (
    <ThemeView style={styles.container}>
      <ThemeText style={styles.title}>Log in</ThemeText>
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
      <ThemeView style={styles.footer}>
        <ThemeText style={styles.footerText}>Don't have an account? </ThemeText>
        <ThemeText
          style={styles.footerLink}
          onPress={() => navigation.navigate('Signup')}>
          Sign up
        </ThemeText>
      </ThemeView>
    </ThemeView>
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
