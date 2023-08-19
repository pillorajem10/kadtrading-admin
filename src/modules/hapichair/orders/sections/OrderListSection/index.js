import React from 'react';
import { useHistory } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// hooks
import useCache from '@hooks/useCache';

// constants
import ROUTE_PATHS from '@constants/paths';

// components
import PageHeaderContainer from '@components/PageHeaderContainer';
import PageHeaderComponent from '@components/PageHeaderComponent';
import TableWithFilter from '@components/TableWithFilter';
import OrderListFilterContainer from '../../components/OrderListFilterContainer';

// utils
import { mapValuesToSearchPayload, orderListColumn } from '../../utils';

// styling
import './index.less';

const tableKey = 'orderListTable2B';

const OrderListSection = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { setCache } = useCache({
    tableKey,
    moduleIndexPath: ROUTE_PATHS.ORDERS,
    storeName: 'hchair.orders',
  });

  const orders = useSelector((state) => state.hchair.orders);

  const { dataList } = orders;

  const handleSearch = (payload) => {
    setCache(payload);
    return dispatch(hchair.orders.getTransactionOrders(payload));
  };

  return (
    <PageHeaderContainer showHeader header={<PageHeaderComponent hideActionButtons />}>
      <div className="order-list-section">
        <TableWithFilter
          tableKey={tableKey}
          onSearch={handleSearch}
          filterInitialValues={{ keyword: '', searchName: 'projectName' }}
          getSearchPayload={mapValuesToSearchPayload}
          paginationInitialValues={{ pageIndex: 1, pageSize: 10 }}
          columns={orderListColumn}
          dataSource={dataList}
          onRowClick={(record) => {
            history.push(`${ROUTE_PATHS.ORDERS}?id=${record.id}`);
          }}
          noSelection
        >
          <OrderListFilterContainer />
        </TableWithFilter>
      </div>
    </PageHeaderContainer>
  );
};

export default OrderListSection;
