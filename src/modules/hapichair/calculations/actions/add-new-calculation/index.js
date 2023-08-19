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
import CalculationForm from '../../components/CalculationForm';

const AddNewCalculation = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSave = async (values) => {
    const { success, data: { _id: calcId } } = await dispatch(hchair.calculations.addCalculation(values));

    if (success) {
      message.success('Calculation created successfully!');
      history.replace(`${ROUTE_PATHS.EDIT_CALCULATION}?id=${calcId}`);
    }
  };

  return <CalculationForm onSave={handleSave} />;
};

export default AddNewCalculation;
