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
import CalculationForm from '../../components/CalculationForm';
import { mapDetailsToValues } from '../../utils';

const EditCalculation = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const calculationState = useSelector((state) => state.hchair.calculations);

  const { calculationDetails } = calculationState;

  const getCalculationDetails = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    dispatch(hchair.calculations.getCalculationById(id));
  }, [dispatch, location]);

  const handleSave = useCallback(
    async (values) => {
      const { _id: userId } = calculationDetails;
      const changedFields = difference(values, mapDetailsToValues(calculationDetails));
      const payload = { id: userId, ...changedFields };

      const success = await dispatch(hchair.calculations.updateCalculation(payload));

      if (success) {
        message.success('Calculation updated successfully!');
        await dispatch(hchair.calculations.getCalculationById(userId));
      }
    },
    [dispatch, calculationDetails],
  );

  useEffect(() => {
    getCalculationDetails();
    return () => {
      dispatch(hchair.calculations.setCalculationDetails(null));
    };
  }, [dispatch, getCalculationDetails]);

  if (!calculationDetails) return <LoadComponent />;

  const initialValues = mapDetailsToValues(calculationDetails);

  return <CalculationForm initialValues={initialValues} onSave={handleSave} />;
};

export default EditCalculation;
