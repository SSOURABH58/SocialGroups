import React from 'react';
import {StyleSheet} from 'react-native';
import Button from './Button';
import {Group} from '../types/Group';
import ThemeText from './ThemeText';
import ThemeView from './ThemeView';

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
    <ThemeView style={styles.container}>
      <ThemeText style={styles.groupName}>{item.name}</ThemeText>
      <Button label="Join Group" onPress={handleJoinGroup} />
    </ThemeView>
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
