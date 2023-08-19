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
import { productListColumns, mapSearchPayload } from '../../utils';
import ProductFilterContainer from '../../components/ProductFilterContainer';

const tableKey = 'productListTable';

const ProductListSection = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.hchair.products);
  const { dataList } = products;

  const { searchPayloadCache, setCache } = useCache({
    tableKey,
    moduleIndexPath: ROUTE_PATHS.PRODUCTS,
    storeName: 'hchair.products',
  });

  const handleSearch = (payload) => {
    setCache(payload);
    return dispatch(hchair.products.getProductList(payload));
  };

  const handleUpdate = async (payload) => {
    await dispatch(common.ui.setLoading());
    const success = await dispatch(hchair.products.simpleUpdateProduct(payload));
    await dispatch(common.ui.clearLoading());

    if (success) {
      message.success('Product updated successfully!');
      const searchPayload = mapSearchPayload(searchPayloadCache);
      await dispatch(hchair.products.getProductList(searchPayload));
    }
  };

  const handleDelete = async (payload) => {
    await dispatch(common.ui.setLoading());
    const res = await dispatch(hchair.products.removeProduct(payload));
    await dispatch(common.ui.clearLoading());

    const { success } = res;

    if (success) {
      message.success('Product removed successfully!');
      const searchPayload = mapSearchPayload(searchPayloadCache);
      dispatch(hchair.products.getProductList(searchPayload));
    }
  };

  const handleClone = async (payload) => {
    await dispatch(common.ui.setLoading());
    const res = await dispatch(hchair.products.cloneProduct({ sourceId: payload }));
    await dispatch(common.ui.clearLoading());

    const { success } = res;

    if (success) {
      message.success('Product cloned successfully!');
      const searchPayload = mapSearchPayload(searchPayloadCache);
      dispatch(hchair.products.getProductList(searchPayload));
    }
  };

  const handleBatchDelete = async (productIds) => {
    await dispatch(common.ui.setLoading());
    await dispatch(hchair.products.batchRemoveProduct(productIds));
    await dispatch(common.ui.clearLoading());
  };

  const handleSelectProduct = (evt, id) => {
    evt.stopPropagation();
    history.push(`${ROUTE_PATHS.EDIT_PRODUCT}?id=${id}`);
  };

  return (
    <>
      <TableWithFilter
        tableKey={tableKey}
        onSearch={handleSearch}
        filterInitialValues={{ keyword: undefined, searchName: 'productName', sortBy: 'default' }}
        getSearchPayload={mapSearchPayload}
        paginationInitialValues={{ pageIndex: 1, pageSize: 50 }}
        columns={productListColumns(handleSelectProduct, handleUpdate, handleClone, handleDelete)}
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
        <ProductFilterContainer />
      </TableWithFilter>
    </>
  );
};

export default ProductListSection;
