import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {theme} from '../utils/theme';

type ButtonProps = TouchableOpacityProps & {
  label: string;
};

const Button: React.FC<ButtonProps> = ({label, ...props}) => {
  const isDarkTheme = useSelector((state: RootState) => state.theme.darkMode);
  const colors = theme(isDarkTheme);
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: colors.ackcolor}]}
      {...props}>
      <Text style={[styles.label, {color: colors.primcolor}]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    margin: 12,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Button;
