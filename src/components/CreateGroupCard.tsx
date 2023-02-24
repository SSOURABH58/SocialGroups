import React, {useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import Button from './Button';
import InputField from './InputField';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (groupName: string) => void;
};

const CreateGroupCard = ({visible, onClose, onSubmit}: Props) => {
  const [groupName, setGroupName] = useState('');

  const handleSubmit = () => {
    onSubmit(groupName);
    setGroupName('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}>
      <View style={styles.modal}>
        <InputField
          label="Group Name"
          placeholder="Enter group name"
          value={groupName}
          onChangeText={setGroupName}
        />
        <Button label="Create Group" onPress={handleSubmit} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#ccc',
    padding: 20,
    borderRadius: 10,
    marginTop: '50%',
    marginHorizontal: '10%',
  },
});

export default CreateGroupCard;
