import React from 'react';
import {TextInput, StyleSheet, TextInputProps, Text} from 'react-native';

type InputFieldProps = TextInputProps & {
  label: string;
};

const InputField: React.FC<InputFieldProps> = ({label, ...props}) => {
  return (
    <>
      <Text>{label}</Text>
      <TextInput style={styles.input} {...props} />
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
