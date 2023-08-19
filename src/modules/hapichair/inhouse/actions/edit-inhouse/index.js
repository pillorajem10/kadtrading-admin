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
import InhouseForm from '../../components/InhouseForm';
import { mapDataToValues } from '../../utils';

const EditInhouse = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const inhouse = useSelector((state) => state.hchair.inhouse);

  const { inhouseDetails } = inhouse;
  
  const getInhouseDetails = useCallback(async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    dispatch(hchair.inhouse.getInhouseDiamond(id));
  }, [dispatch, location]);

  const handleSave = useCallback(
    async (values) => {
      const { _id: inhouseId } = inhouseDetails;
      const changedFields = difference(values, mapDataToValues(inhouseDetails));
      const payload = { id: inhouseId, ...changedFields };

      const success = await dispatch(hchair.inhouse.updateInhouseDiamond(payload));
      if (success) {
        message.success('Inhouse diamond updated successfully!');
        await getInhouseDetails();
      }
    },
    [dispatch, inhouseDetails, getInhouseDetails]
  );

  useEffect(() => {
    getInhouseDetails();
    return () => dispatch(hchair.inhouse.resetInhouseDiamondDetails());
  }, [dispatch, getInhouseDetails]);

  if (!inhouseDetails) {
    return <LoadComponent />;
  }

  const initialValues = mapDataToValues(inhouseDetails);

  return (
    <>
      <InhouseForm initialValues={initialValues} onSave={handleSave} />
    </>
  );
};

export default EditInhouse;
