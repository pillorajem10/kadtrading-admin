import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// antd
import { message } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// utils
import { difference } from '@utils/methods';

// components
import LoadComponent from '@components/LoadComponent';
import MemberForm from '../../components/MemberForm';
import { mapDetailsToValues } from '../../utils';

const EditMember = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const memberState = useSelector((state) => state.hchair.members);

  const { memberDetails } = memberState;

  const getMemberDetails = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    dispatch(hchair.members.getMemberById(id));
  }, [dispatch, location]);

  const handleSave = useCallback(
    async (values) => {
      const { _id: userId } = memberDetails;
      const changedFields = difference(values, mapDetailsToValues(memberDetails));
      const payload = { id: userId, ...changedFields };

      const success = await dispatch(hchair.members.updateMember(payload));

      if (success) {
        message.success('Member updated successfully!');
        await dispatch(hchair.members.getMemberById(userId));
      }
    },
    [dispatch, memberDetails],
  );

  useEffect(() => {
    getMemberDetails();
    return () => {
      dispatch(hchair.members.setMemberDetails(null));
    };
  }, [dispatch, getMemberDetails]);

  if (!memberDetails) return <LoadComponent />;

  const initialValues = mapDetailsToValues(memberDetails);

  return <MemberForm initialValues={initialValues} onSave={handleSave} />;
};

export default EditMember;
