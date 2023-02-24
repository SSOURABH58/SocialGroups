import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Group} from '../types/Group';

interface props {
  item: Group;
}

const GroupItem = ({item}: props) => {
  return (
    <View style={styles.groupItem}>
      <Text style={styles.groupName}>{item.name}</Text>
    </View>
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
