import React from 'react';
import {View, ViewProps} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {theme} from '../utils/theme';

type Props = ViewProps & {
  darkColor?: string;
  lightColor?: string;
};

const ThemeView = ({
  darkColor = '#222',
  lightColor = '#ddd',
  style,
  children,
  ...rest
}: Props) => {
  const isDarkTheme = useSelector((state: RootState) => state.theme.darkMode);
  const colors = theme(isDarkTheme);
  return (
    <View style={[style, {backgroundColor: colors.bgcolor}]} {...rest}>
      {children}
    </View>
  );
};

export default ThemeView;
