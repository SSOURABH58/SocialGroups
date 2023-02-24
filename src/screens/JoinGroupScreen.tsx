import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TextInput} from 'react-native';
import Button from '../components/Button';
import {Group} from '../types/Group';
import {useDispatch} from 'react-redux';
import JoinGroupItem from '../components/JoinGroupItem';
import InputField from '../components/InputField';
import {joinGroup, searchGroup} from '../utils/groups';

const JoinGroupScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Group[]>([]);
  const [joining, setJoining] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    const result = await searchGroup(searchQuery);
    setSearchResult(result);
  };

  const handleJoinGroup = async (groupId: string) => {
    setJoining(true);
    await joinGroup(groupId);
    setJoining(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join a Group</Text>
      <View style={styles.searchContainer}>
        <InputField
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Enter group name"
          label="Search groups"
        />
        <Button label="Search" onPress={handleSearch} />
      </View>
      <View style={styles.resultsContainer}>
        <FlatList
          data={searchResult}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <JoinGroupItem item={item} onPress={handleJoinGroup} />
          )}
          style={styles.resultsContainer}
        />
      </View>
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
  searchContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  resultsContainer: {
    flex: 1,
  },
});

export default JoinGroupScreen;
