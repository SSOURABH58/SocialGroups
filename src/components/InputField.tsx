import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {theme} from '../utils/theme';
import ThemeText from './ThemeText';

type InputFieldProps = TextInputProps & {
  label: string;
};

const InputField: React.FC<InputFieldProps> = ({label, ...props}) => {
  const isDarkTheme = useSelector((state: RootState) => state.theme.darkMode);
  const colors = theme(isDarkTheme);
  return (
    <>
      <ThemeText>{label}</ThemeText>
      <TextInput
        style={[
          styles.input,
          {color: colors.primcolor, borderColor: colors.primcolor},
        ]}
        placeholderTextColor={colors.primcolor}
        {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default InputField;
