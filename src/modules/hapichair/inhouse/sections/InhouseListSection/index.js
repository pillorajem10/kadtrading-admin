import React from 'react';
import { useHistory } from 'react-router-dom';

// antd
import { message } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { common, hchair } from '@redux/combineActions';

// hooks
import useCache from '@hooks/useCache';

// constants
import ROUTE_PATHS from '@constants/paths';

// components
import TableWithFilter from '@components/TableWithFilter';
import InhouseListFilter from '../../components/InhouseListFilter';

// utils
import { inhouseListColumns, getSearchPayload, tableKey } from '../../utils';

const InhouseListSection = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const inhouse = useSelector((state) => state.hchair.inhouse);
  const { dataList } = inhouse;

  const { searchPayloadCache, setCache } = useCache({
    tableKey,
    moduleIndexPath: ROUTE_PATHS.INHOUSE,
    storeName: 'hchair.inhouse',
  });

  const handleSearch = (payload) => {
    setCache(payload);
    return dispatch(hchair.inhouse.getInhouseDiamondList(payload));
  };

  const handleSelect = (event, id) => {
    event.stopPropagation();
    history.push(`${ROUTE_PATHS.EDIT_INHOUSE}?id=${id}`);
  };

  const handleUpdate = async (payload) => {
    await dispatch(common.ui.setLoading());
    const success = await dispatch(hchair.inhouse.updateInhouseDiamond(payload));
    await dispatch(common.ui.clearLoading());

    if (success) {
      message.success('Inhouse diamond updated successfully!');
      const searchPayload = getSearchPayload(searchPayloadCache);
      dispatch(hchair.inhouse.getInhouseDiamondList(searchPayload));
    }
  };

  const handleBatchDelete = async (inhouseIds) => {
    await dispatch(common.ui.setLoading());
    const success = await dispatch(hchair.inhouse.batchRemoveInhouseDiamond(inhouseIds));
    await dispatch(common.ui.clearLoading());

    if (success) {
      message.success('Delete successful!');
      const searchPayload = getSearchPayload(searchPayloadCache);
      dispatch(hchair.inhouse.getInhouseDiamondList(searchPayload));
    }
  };

  return (
    <div>
      <TableWithFilter
        tableKey={tableKey}
        onSearch={handleSearch}
        filterInitialValues={{ displayName: undefined, sortBy: 'default' }}
        getSearchPayload={getSearchPayload}
        paginationInitialValues={{ pageIndex: 1, pageSize: 50 }}
        columns={inhouseListColumns(handleUpdate, handleSelect)}
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
        <InhouseListFilter />
      </TableWithFilter>
    </div>
  );
};

export default InhouseListSection;
