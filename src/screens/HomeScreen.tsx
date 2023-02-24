import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import InputField from '../components/InputField';
import {RootState} from '../store/store';
import {Group} from '../types/Group';
import GroupItem from '../components/GroupItem';
import CreateGroupCard from '../components/CreateGroupCard';
import {createGroup} from '../utils/groups';
import firestore from '@react-native-firebase/firestore';
import {updateProfile} from '../store/authSlice';
import {profile} from '../types/User';

const HomeScreen = () => {
  const groupsRef = firestore().collection('groups');

  const navigation = useNavigation();
  const [groups, setGroups] = useState<Group[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  const userId = user?.uid;
  const groupIds = user?.profile?.groups;

  console.log(groups);

  const handleCreateGroup = async (groupName: string) => {
    await createGroup(groupName);
    setModalVisible(false);
  };

  const handleJoinGroup = () => {
    // navigation.navigate('JoinGroup');
  };

  useEffect(() => {
    const unsubscribe = userId
      ? firestore()
          .collection('users')
          .doc(userId)
          .onSnapshot(documentSnapshot => {
            console.log('User data: ', documentSnapshot.data());
            dispatch(updateProfile(documentSnapshot.data() as profile));
          })
      : null;

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [userId]);

  useEffect(() => {
    const unsubscribe = groupIds
      ? groupsRef
          .where(firestore.FieldPath.documentId(), 'in', groupIds)
          .onSnapshot(querySnapshot => {
            const newGroups: Group[] = [];
            querySnapshot.forEach(doc => {
              const {name} = doc.data();
              newGroups.push({
                name,
                id: doc.id,
              });
            });
            setGroups(newGroups);
          })
      : null;
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [groupIds]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.profile?.displayName}!</Text>
      <Text style={styles.subtitle}>Your Groups</Text>
      <FlatList
        data={groups}
        keyExtractor={item => item.id}
        renderItem={({item}) => <GroupItem item={item} key={item.id} />}
        style={styles.groupList}
      />
      <Button label="Create Group" onPress={() => setModalVisible(true)} />
      <Button label="Join Group" onPress={handleJoinGroup} />
      <CreateGroupCard
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateGroup}
      />
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default HomeScreen;
