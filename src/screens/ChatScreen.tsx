import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Message} from '../types/Message';
import firestore from '@react-native-firebase/firestore';
import Button from '../components/Button';
import MessageItem from '../components/MessageItem';
import ThemeView from '../components/ThemeView';
import ThemeText from '../components/ThemeText';

const ChatScreen = () => {
  const navigation = useNavigation();
  const currentGroupID = useSelector(
    (state: RootState) => state.app.currentGroupID,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const unsubscribe = currentGroupID
      ? firestore()
          .collection('groups')
          .doc(currentGroupID)
          .collection('messages')
          .orderBy('timestamp', 'desc')
          .onSnapshot(querySnapshot => {
            const newMessages: Message[] = [];
            querySnapshot.forEach(doc => {
              const message = doc.data() as Message;
              newMessages.push({
                id: doc.id,
                text: message.text,
                user: message.user,
                timestamp: message.timestamp.toDate(),
              });
            });
            setMessages(newMessages);
          })
      : null;
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [currentGroupID]);

  const handleSend = () => {
    if (text.length === 0) {
      return;
    }

    const newMessage = {
      text: text,
      user: {
        uid: user?.uid || '',
        displayName: user?.profile?.displayName || '',
      },
      timestamp: new Date(),
    };
    if (currentGroupID)
      firestore()
        .collection('groups')
        .doc(currentGroupID)
        .collection('messages')
        .add(newMessage)
        .then(() => {
          setText('');
        })
        .catch(error => {
          console.error('Error writing new message to Firestore: ', error);
        });
  };

  return (
    <ThemeView style={styles.container}>
      <ThemeText style={styles.title}>Group Chat</ThemeText>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => <MessageItem item={item} key={item.id} />}
        style={styles.messageList}
        inverted
      />
      <ThemeView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type your message here..."
        />
        <Button label="Send" onPress={handleSend} />
      </ThemeView>
    </ThemeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  messageList: {
    marginTop: 8,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default ChatScreen;
