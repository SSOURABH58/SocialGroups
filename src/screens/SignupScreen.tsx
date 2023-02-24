import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import InputField from '../components/InputField';
import Button from '../components/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {signupUser} from '../store/authSlice';
import {AppDispatch} from '../store/store';
import ThemeView from '../components/ThemeView';
import ThemeText from '../components/ThemeText';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setUsername] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignup = () => {
    dispatch(signupUser({email, password, displayName}));
  };

  return (
    <ThemeView style={styles.container}>
      <ThemeText style={styles.title}>Sign up</ThemeText>
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
      <InputField
        label="displayName"
        value={displayName}
        onChangeText={setUsername}
      />
      <Button label="Sign up" onPress={handleSignup} />
      <ThemeView style={styles.footer}>
        <ThemeText style={styles.footerText}>
          Already have an account?{' '}
        </ThemeText>
        <ThemeText
          style={styles.footerLink}
          onPress={() => navigation.navigate('Login')}>
          Log in
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

export default SignupScreen;
