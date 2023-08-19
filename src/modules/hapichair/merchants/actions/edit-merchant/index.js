import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// antd
import { message } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// components
import LoadComponent from '@components/LoadComponent';
import MerchantForm from '../../components/MerchantForm';
import { mapDataToValues } from '../../utils';

const EditMerchant = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const merchants = useSelector((state) => state.hchair.merchants);

  const { merchantDetails } = merchants;

  const getMerchantDetails = useCallback(async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    console.log('[getMerchantDetails] ', id);

    dispatch(hchair.merchants.getMerchantById(id));
  }, [dispatch, location]);

  const handleSave = async (values) => {
    console.log('[MERCHANT handleSave] ', values);
    const success = await dispatch(hchair.merchants.upsertMerchant(values));
    if (success) {
      message.success('Merchant updated successfully!');
      await getMerchantDetails();
    }
  };

  useEffect(() => {
    getMerchantDetails();
  }, [getMerchantDetails]);

  useEffect(() => {
    return () => dispatch(hchair.merchants.resetMerchantDetails());
  }, [dispatch]);

  if (!merchantDetails) {
    return <LoadComponent />;
  }

  const initialValues = mapDataToValues(merchantDetails);

  return (
    <>
      <MerchantForm initialValues={initialValues} onSave={handleSave} />
    </>
  );
};

export default EditMerchant;
