import React from 'react';
import { useHistory } from 'react-router-dom';

// antd
import { message } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { common, hchair } from '@redux/combineActions';

// components
import TableWithFilter from '@components/TableWithFilter';

// constants
import ROUTE_PATHS from '@constants/paths';

// hooks
import useCache from '@hooks/useCache';

// utils
import { calculationListColumn, mapSearchPayload } from '../../utils';
import CalculationFilterContainer from '../../components/CalculationFilterContainer';

const tableKey = 'calculationListTable';

const CalculationListSection = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const calculations = useSelector((state) => state.hchair.calculations);
  const { dataList } = calculations;

  const { searchPayloadCache, setCache } = useCache({
    tableKey,
    moduleIndexPath: ROUTE_PATHS.CALCULATIONS,
    storeName: 'hchair.calculations',
  });

  const handleSearch = (payload) => {
    setCache(payload);
    return dispatch(hchair.calculations.getCalculationList(payload));
  };

  const handleUpdate = async (payload) => {
    await dispatch(common.ui.setLoading());
    const success = await dispatch(hchair.calculations.simpleUpdateCalculation(payload));
    await dispatch(common.ui.clearLoading());

    if (success) {
      message.success('Calculation updated successfully!');
      const searchPayload = mapSearchPayload(searchPayloadCache);
      await dispatch(hchair.calculations.getCalculationList(searchPayload));
    }
  };

  const handleDelete = async (payload) => {
    await dispatch(common.ui.setLoading());
    const res = await dispatch(hchair.calculations.removeCalculation(payload));
    await dispatch(common.ui.clearLoading());

    const { success } = res;

    if (success) {
      message.success('Calculation removed successfully!');
      const searchPayload = mapSearchPayload(searchPayloadCache);
      dispatch(hchair.calculations.getCalculationList(searchPayload));
    }
  };

  const handleBatchDelete = async (calculationIds) => {
    await dispatch(common.ui.setLoading());
    await dispatch(hchair.calculations.batchRemoveCalculation(calculationIds));
    await dispatch(common.ui.clearLoading());
  };

  const handleSelectCalculation = (evt, id) => {
    evt.stopPropagation();
    history.push(`${ROUTE_PATHS.EDIT_CALCULATION}?id=${id}`);
  };

  return (
    <>
      <TableWithFilter
        tableKey={tableKey}
        onSearch={handleSearch}
        filterInitialValues={{ keyword: undefined, searchName: 'name', sortBy: 'default' }}
        getSearchPayload={mapSearchPayload}
        paginationInitialValues={{ pageIndex: 1, pageSize: 50 }}
        columns={calculationListColumn(handleSelectCalculation, handleUpdate, handleDelete)}
        dataSource={dataList}
        selectionProps={{
          show: true,
          onDelete: handleBatchDelete,
        }}
        pageSizeProps={{
          dropdownOptions: [
            { value: '50', label: '50' },
            { value: '100', label: '100' },
            { value: '250', label: '250' },
            { value: '300', label: '300' },
          ],
        }}
      >
        <CalculationFilterContainer />
      </TableWithFilter>
    </>
  );
};

export default CalculationListSection;
