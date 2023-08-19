import React from 'react';
import { useHistory } from 'react-router-dom';

// antd
import { message } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// constants
import ROUTE_PATHS from '@constants/paths';

// utils
import { getSearchPayload, tableKey } from '../../utils';

// components
import MerchantForm from '../../components/MerchantForm';

const AddNewMerchant = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const table = useSelector((state) => state.common.table);

  const handleSave = async (values) => {
    const payload = { ...values };
    const success = await dispatch(hchair.merchants.upsertMerchant(payload));

    if (success) {
      message.success('Merchant created successfully!');

      let searchPayload = {};

      if (table[tableKey]?.filterValues) {
        const { filterValues } = table[tableKey];
        searchPayload = getSearchPayload(filterValues);
      }

      const { data } = await dispatch(hchair.merchants.getMerchantList(searchPayload));
      if (data) {
        const { _id } = data[0];
        history.replace(`${ROUTE_PATHS.EDIT_MERCHANT}?id=${_id}`);
      }
    }
  };

  return (
    <div>
      <MerchantForm onSave={handleSave} />
    </div>
  );
};

export default AddNewMerchant;
