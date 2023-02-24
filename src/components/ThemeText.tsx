import React from 'react';
import {Text, TextProps} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {theme} from '../utils/theme';

type Props = TextProps & {
  darkColor?: string;
  lightColor?: string;
};

const ThemeText = ({
  darkColor = '#fff',
  lightColor = '#000',
  style,
  children,
  ...rest
}: Props) => {
  const isDarkTheme = useSelector((state: RootState) => state.theme.darkMode);
  const colors = theme(isDarkTheme);
  return (
    <Text style={[style, {color: colors.primcolor}]} {...rest}>
      {children}
    </Text>
  );
};

export default ThemeText;
