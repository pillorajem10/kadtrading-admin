import React from 'react';

// antd
import { Button } from 'antd';

// constants
import ROUTE_PATHS from '@constants/paths';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// service
import { fetchUpdatedRates } from '@service/api/calculation2b';

// components
import PageHeaderContainer from '@components/PageHeaderContainer';
import PageHeaderComponent from '@components/PageHeaderComponent';
import CalculationListSection from './sections/CalculationListSection';

const Calculations = () => {
  const dispatch = useDispatch();
  
  const calculations = useSelector((state) => state.hchair.calculations);

  const handleUpdateRates = async () => {
    const res = await fetchUpdatedRates({ currency: 'SGD' });
    const { dataList } = calculations;
    const { success, data } = res;
    if (success) {
      dataList.map(async rcd => {
        const { _id: calcId } = rcd;
        const payload = { id: calcId, rates: JSON.stringify(data.data) };
        const updateDone = await dispatch(hchair.calculations.updateCalculation(payload));
        return { updateDone, rcd };
      });
    }
  };

  return (
    <PageHeaderContainer
      showHeader
      header={
        <PageHeaderComponent
          extras={[
            <Button
            key={1}
            onClick={() => {
              handleUpdateRates();
            }}
            type="primary">Update Rates</Button>            
          ]}                
          addNewPageUrl={ROUTE_PATHS.ADD_CALCULATION} />}
    >
      <CalculationListSection />
    </PageHeaderContainer>
  );
};

export default Calculations;
