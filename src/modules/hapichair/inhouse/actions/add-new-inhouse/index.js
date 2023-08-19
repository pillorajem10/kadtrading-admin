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
import InhouseForm from '../../components/InhouseForm';

const AddNewInhouse = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const table = useSelector((state) => state.common.table);

  const handleSave = async (values) => {
    const payload = { ...values };
    const success = await dispatch(hchair.merchants.addInhouseDiamond(payload));

    if (success) {
      message.success('Inhouse diamond created successfully!');

      let searchPayload = {};

      if (table[tableKey]?.filterValues) {
        const { filterValues } = table[tableKey];
        searchPayload = getSearchPayload(filterValues);
      }

      const { data } = await dispatch(hchair.inhouse.getInhouseDiamondList(searchPayload));
      if (data) {
        const { _id } = data[0];
        history.replace(`${ROUTE_PATHS.EDIT_INHOUSE}?id=${_id}`);
      }
    }
  };

  return (
    <div>
      <InhouseForm onSave={handleSave} />
    </div>
  );
};

export default AddNewInhouse;
