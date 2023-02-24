import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {Group} from '../types/Group';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {setCurrentGroupID} from '../store/appSlice';

interface props {
  item: Group;
}

const GroupItem = ({item}: props) => {
  const navigator = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentGroupID(item.id));
    navigator.navigate('Chat', {groupId: item.id});
  };
  return (
    <Pressable style={styles.groupItem} onPress={handleClick}>
      <Text style={styles.groupName}>{item.name}</Text>
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
