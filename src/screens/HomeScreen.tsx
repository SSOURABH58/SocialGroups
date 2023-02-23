import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
import Button from '../components/Button';

interface Group {
  id: string;
  name: string;
  description: string;
}

interface Message {
  id: string;
  groupId: string;
  text: string;
  timestamp: number;
}

const HomeScreen = () => {
  // const navigation = useNavigation();
  const [groups, setGroups] = useState<Group[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  // const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  // Load groups and messages from Firebase when the component mounts
  useEffect(() => {
    // TODO: Load groups and messages from Firebase
    // For now, we'll just use some dummy data
    const dummyGroups: Group[] = [
      {id: '1', name: 'Group 1', description: 'Description of Group 1'},
      {id: '2', name: 'Group 2', description: 'Description of Group 2'},
      {id: '3', name: 'Group 3', description: 'Description of Group 3'},
    ];
    setGroups(dummyGroups);

    const dummyMessages: Message[] = [
      {
        id: '1',
        groupId: '1',
        text: 'Message 1 for Group 1',
        timestamp: Date.now(),
      },
      {
        id: '2',
        groupId: '1',
        text: 'Message 2 for Group 1',
        timestamp: Date.now(),
      },
      {
        id: '3',
        groupId: '2',
        text: 'Message 1 for Group 2',
        timestamp: Date.now(),
      },
    ];
    setMessages(dummyMessages);
  }, []);

  const handleCreateGroup = () => {
    // navigation.navigate('CreateGroup');
  };

  const handleJoinGroup = () => {
    // navigation.navigate('JoinGroup');
  };

  const renderGroupItem = ({item}: {item: Group}) => (
    <View style={styles.groupItem}>
      <Text style={styles.groupName}>{item.name}</Text>
      <Text style={styles.groupDescription}>{item.description}</Text>
    </View>
  );

  const renderMessageItem = ({item}: {item: Message}) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTimestamp}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Sourabh!</Text>
      {/* <Text style={styles.title}>Welcome, {currentUser?.displayName}!</Text> */}
      <Text style={styles.subtitle}>Your Groups</Text>
      <FlatList
        data={groups}
        keyExtractor={item => item.id}
        renderItem={renderGroupItem}
        style={styles.groupList}
      />
      <Text style={styles.subtitle}>Your Messages</Text>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessageItem}
        style={styles.messageList}
      />
      <Button label="Create Group" onPress={handleCreateGroup} />
      <Button label="Join Group" onPress={handleJoinGroup} />
    </View>
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  groupList: {
    marginTop: 8,
    marginBottom: 16,
  },
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
  messageList: {
    marginTop: 8,
    marginBottom: 16,
  },
  messageItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 14,
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default HomeScreen;
