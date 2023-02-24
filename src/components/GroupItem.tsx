import {StyleSheet, View, Pressable} from 'react-native';
import React from 'react';
import {Group} from '../types/Group';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentGroupID} from '../store/appSlice';
import ThemeText from './ThemeText';
import {RootState} from '../store/store';
import {theme} from '../utils/theme';

interface props {
  item: Group;
}

const GroupItem = ({item}: props) => {
  const navigator = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state: RootState) => state.theme.darkMode);
  const colors = theme(isDarkTheme);

  const handleClick = () => {
    dispatch(setCurrentGroupID(item.id));
    navigator.navigate('Chat', {groupId: item.id});
  };
  return (
    <Pressable
      style={[styles.groupItem, {backgroundColor: colors.ackcolor}]}
      onPress={handleClick}>
      <ThemeText style={styles.groupName}>{item.name}</ThemeText>
    </Pressable>
  );
};

export default GroupItem;

const styles = StyleSheet.create({
  groupItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  groupDescription: {
    fontSize: 14,
  },
});
