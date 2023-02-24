import React, {useState} from 'react';
import {StyleSheet, Modal} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {theme} from '../utils/theme';
import Button from './Button';
import InputField from './InputField';
import ThemeView from './ThemeView';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (groupName: string) => void;
};

const CreateGroupCard = ({visible, onClose, onSubmit}: Props) => {
  const [groupName, setGroupName] = useState('');
  const isDarkTheme = useSelector((state: RootState) => state.theme.darkMode);
  const colors = theme(isDarkTheme);

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
      <ThemeView style={[styles.modal, {borderColor: colors.ackcolor}]}>
        <InputField
          label="Group Name"
          placeholder="Enter group name"
          value={groupName}
          onChangeText={setGroupName}
        />
        <Button label="Create Group" onPress={handleSubmit} />
      </ThemeView>
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
    borderWidth: 8,
  },
});

export default CreateGroupCard;
