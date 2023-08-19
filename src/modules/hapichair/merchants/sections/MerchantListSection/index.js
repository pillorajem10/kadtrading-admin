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
import MerchantListFilter from '../../components/MerchantListFilter';

// utils
import { merchantListColumns, getSearchPayload, tableKey } from '../../utils';

const MerchantListSection = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const merchants = useSelector((state) => state.hchair.merchants);
  const { dataList } = merchants;

  const { searchPayloadCache, setCache } = useCache({
    tableKey,
    moduleIndexPath: ROUTE_PATHS.MERCHANTS,
    storeName: 'hchair.merchants',
  });

  const handleSearch = (payload) => {
    setCache(payload);
    return dispatch(hchair.merchants.getMerchantList(payload));
  };

  const handleSelect = (event, id) => {
    event.stopPropagation();
    history.push(`${ROUTE_PATHS.EDIT_MERCHANT}?id=${id}`);
  };

  const handleUpdate = async (payload) => {
    await dispatch(common.ui.setLoading());
    const success = await dispatch(hchair.merchants.updateMerchant(payload));
    await dispatch(common.ui.clearLoading());

    if (success) {
      message.success('Merchant updated successfully!');
      const searchPayload = getSearchPayload(searchPayloadCache);
      dispatch(hchair.merchants.getMerchantList(searchPayload));
    }
  };

  const handleBatchDelete = async (merchantIds) => {
    await dispatch(common.ui.setLoading());
    const success = await dispatch(hchair.merchants.batchRemoveMerchant(merchantIds));
    await dispatch(common.ui.clearLoading());

    if (success) {
      message.success('Delete successfully!');
      const searchPayload = getSearchPayload(searchPayloadCache);
      dispatch(hchair.merchants.getMerchantList(searchPayload));
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
        columns={merchantListColumns(handleUpdate, handleSelect)}
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
        <MerchantListFilter />
      </TableWithFilter>
    </div>
  );
};

export default MerchantListSection;
