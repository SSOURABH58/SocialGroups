import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from './Button';
import {Group} from '../types/Group';

type Props = {
  item: Group;
  onPress: (groupId: string) => void;
};

const JoinGroupItem = ({item, onPress}: Props) => {
  const handleJoinGroup = () => {
    console.log(item.id);

    onPress(item.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.groupName}>{item.name}</Text>
      <Button label="Join Group" onPress={handleJoinGroup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  groupName: {
    fontSize: 16,
  },
});

export default JoinGroupItem;
