import React from 'react';

import { message } from 'antd';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// constants
import ROUTE_PATHS from '@constants/paths';

// hooks
import useCache from '@hooks/useCache';
import useDisclosure from '@hooks/useDisclosure';

// components
import TableWithFilter from '@components/TableWithFilter';
import ProductRatesFilterContainer from '../../components/ProductRatesFilterContainer';
import ProductRatesModal from '../../components/ProductRatesModal';

// utils
import { productRatesListColumn, mapSearchPayload, tableKey } from './utils';

// Styling
import '../../index.less';

const ProductRatesListSection = ({ form }) => {
  const { isOpen, toggleOpen } = useDisclosure();
  const dispatch = useDispatch();
  const members = useSelector((state) => state.hchair.members);
  const { productRates } = members;

  const { searchPayloadCache, setCache } = useCache({
    tableKey,
    moduleIndexPath: ROUTE_PATHS.EDIT_MEMBER,
    storeName: 'hchair.productRates',
  });

  const handleSearch = (payload) => {
    setCache(payload);
    return dispatch(hchair.members.getProductRatesList(payload));
  };

  const handleShowModal = (record) => {
    dispatch(hchair.members.setProductRate(record));
    toggleOpen();
  };

  const handleOkModal = () => {
    message.success('Product rates updated.');
    toggleOpen();
    handleSearch(mapSearchPayload(searchPayloadCache));
  };

  return (
    <>
      <ProductRatesModal
        visible={isOpen}
        member={form.getFieldsValue()}
        onOk={handleOkModal}
        onCancel={() => toggleOpen()}
      />

      <TableWithFilter
        noSelection
        tableKey={tableKey}
        onSearch={handleSearch}
        filterInitialValues={{
          corpId: form.getFieldValue('id'),
          keyword: undefined,
          searchName: 'productName',
          sortBy: 'default',
        }}
        getSearchPayload={mapSearchPayload}
        paginationInitialValues={{ corpId: form.getFieldValue('id'), pageIndex: 1, pageSize: 50 }}
        columns={productRatesListColumn(handleShowModal)}
        dataSource={productRates}
        pageSizeProps={{
          dropdownOptions: [
            { value: '50', label: '50' },
            { value: '100', label: '100' },
            { value: '250', label: '250' },
            { value: '300', label: '300' },
          ],
        }}
      >
        <ProductRatesFilterContainer />
      </TableWithFilter>
    </>
  );
};

export default ProductRatesListSection;
