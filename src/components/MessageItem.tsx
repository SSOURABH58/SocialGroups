import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Message} from '../types/Message';

interface prop {
  item: Message;
}

const MessageItem = ({item}: prop) => {
  const {text, timestamp, user} = item;
  // const time = new Date(timestamp?.toDate()).toLocaleString();
  const CurrentUser = useSelector((state: RootState) => state.auth.user?.uid);
  console.log(CurrentUser, user);

  return (
    <View
      style={
        CurrentUser === user.uid
          ? styles.currentUserContainer
          : styles.otherUserContainer
      }>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{text}</Text>
        {/* <Text style={styles.timestampText}>{time}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentUserContainer: {
    alignItems: 'flex-end',
    // backgroundColor: 'blue',
    margin: 8,
  },
  otherUserContainer: {
    alignItems: 'flex-start',
    margin: 8,
  },
  messageContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 14,
  },
  timestampText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
});

export default MessageItem;
