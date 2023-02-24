import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Group} from '../types/Group';

export const createGroup = async (name: string) => {
  const uid = auth().currentUser?.uid;
  if (!uid) {
    throw new Error('User not authenticated');
  }

  // Create a new group document in Firestore
  const groupDocRef = await firestore()
    .collection('groups')
    .add({
      name,
      members: [uid],
    });

  // Add the group ID to the user's groups array
  const userDocRef = firestore().collection('users').doc(uid);
  await userDocRef.update({
    groups: firestore.FieldValue.arrayUnion(groupDocRef.id),
  });
};

export const searchGroup = async (name: string) => {
  const groupDocs = await firestore()
    .collection('groups')
    .where('name', 'in', name)
    .get();

  if (groupDocs.empty) {
    return null;
  } else {
    const groupDoc = groupDocs.docs;
    return groupDoc.map(val => ({
      id: val.id,
      name: val.data()?.name,
    }));
  }
};

export const joinGroup = async (groupId: string) => {
  const uid = auth().currentUser?.uid;
  if (!uid) {
    throw new Error('User not authenticated');
  }

  // Add the user to the group's members array
  const groupDocRef = firestore().collection('groups').doc(groupId);
  await groupDocRef.update({
    members: firestore.FieldValue.arrayUnion(uid),
  });

  // Add the group ID to the user's groups array
  const userDocRef = firestore().collection('users').doc(uid);
  await userDocRef.update({
    groups: firestore.FieldValue.arrayUnion(groupId),
  });
};
