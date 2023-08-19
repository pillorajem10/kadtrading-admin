import React from 'react';
import { useHistory } from 'react-router-dom';

// antd
import { message } from 'antd';

// redux
import { useDispatch } from 'react-redux';
import { hchair } from '@redux/combineActions';

// constants
import ROUTE_PATHS from '@constants/paths';

// components
import MemberForm from '../../components/MemberForm';

const AddNewMember = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSave = async (values) => {
    const { success, data } = await dispatch(hchair.members.addMember(values));

    if (success) {
      message.success('Member created successfully!');
      history.replace(`${ROUTE_PATHS.EDIT_MEMBER}?id=${data.id}`);
    }
  };

  return <MemberForm onSave={handleSave} />;
};

export default AddNewMember;
