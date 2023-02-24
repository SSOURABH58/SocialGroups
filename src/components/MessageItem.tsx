import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Message} from '../types/Message';
import {theme} from '../utils/theme';
import ThemeText from './ThemeText';
import ThemeView from './ThemeView';

interface prop {
  item: Message;
}

const MessageItem = ({item}: prop) => {
  const {text, timestamp, user} = item;
  // const time = new Date(timestamp?.toDate()).toLocaleString();
  const CurrentUser = useSelector((state: RootState) => state.auth.user?.uid);
  const isCurrentUser = CurrentUser === user.uid;

  const isDarkTheme = useSelector((state: RootState) => state.theme.darkMode);
  const colors = theme(isDarkTheme);

  const myMsgColor = isDarkTheme ? '#A77979' : '#F4EAD5';

  return (
    <View
      style={
        isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer
      }>
      <View
        style={[
          styles.messageContainer,
          {backgroundColor: isCurrentUser ? myMsgColor : colors.ackcolor},
        ]}>
        <ThemeText style={styles.messageText}>{text}</ThemeText>
        {/* <ThemeText style={styles.timestampText}>{time}</ThemeText> */}
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
    paddingHorizontal: 12,
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
