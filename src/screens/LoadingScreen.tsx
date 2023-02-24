import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import ThemeText from '../components/ThemeText';
import ThemeView from '../components/ThemeView';

const LoadingScreen = () => {
  return (
    <ThemeView style={styles.container}>
      <ThemeText>Loading ...</ThemeText>
      <ActivityIndicator size="large" color="#0000ff" />
    </ThemeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreen;
