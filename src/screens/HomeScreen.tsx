import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, Modal} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
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
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {setDarkMode} from '../store/themeSlice';
import ThemeText from '../components/ThemeText';
import ThemeView from '../components/ThemeView';

const HomeScreen = () => {
  const groupsRef = firestore().collection('groups');

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [groups, setGroups] = useState<Group[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const isDarkTheme = useSelector((state: RootState) => state.theme.darkMode);

  const dispatch = useDispatch();

  const userId = user?.uid;
  const groupIds = user?.profile?.groups;

  const handleTheme = () => {
    dispatch(setDarkMode(!isDarkTheme));
  };
  const handleCreateGroup = async (groupName: string) => {
    await createGroup(groupName);
    setModalVisible(false);
  };

  const handleJoinGroup = () => {
    navigation.navigate('JoinGroup');
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
    const unsubscribe =
      groupIds && groupIds.length
        ? groupsRef
            .where(firestore.FieldPath.documentId(), 'in', groupIds)
            .onSnapshot(querySnapshot => {
              const newGroups: Group[] = [];
              querySnapshot.forEach(doc => {
                const {name, members} = doc.data();
                newGroups.push({
                  name,
                  id: doc.id,
                  members,
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
    <ThemeView style={[styles.container]}>
      <ThemeText style={styles.title}>
        Welcome, {user?.profile?.displayName}!
      </ThemeText>
      <ThemeText style={styles.subtitle}>Your Groups</ThemeText>
      <FlatList
        data={groups}
        keyExtractor={item => item.id}
        renderItem={({item}) => <GroupItem item={item} key={item.id} />}
        style={styles.groupList}
      />
      <Button label="Create Group" onPress={() => setModalVisible(true)} />
      <Button label="Join Group" onPress={handleJoinGroup} />
      <Button
        label={isDarkTheme ? 'Use Light Theme' : 'Use Dark Theme'}
        onPress={handleTheme}
      />
      <CreateGroupCard
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateGroup}
      />
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
