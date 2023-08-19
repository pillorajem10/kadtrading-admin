import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// antd
import { message } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { common, hchair } from '@redux/combineActions';

// components
import PageHeaderContainer from '@components/PageHeaderContainer';
import LoadComponent from '@components/LoadComponent';
import Header from '../../components/Header';
import CustomerInformation from '../../components/CustomerInformation';
import ProductList from '../../components/ProductList';
import DeliveryOrder from '../../components/DeliveryOrder';
import PaymentRecords from '../../components/PaymentRecords';

// utils
import { tabs } from '../../utils';

// styling
import styles from './index.module.less';

const OrderDetailSection = () => {
  const dispatch = useDispatch();
  const {
    ui: { loading },
    hchair: {
      orders: { orderDetail, headerTabIndex },
    },
  } = useSelector((state) => state);

  const location = useLocation();

  const handleGetTransactionOrderDetails = useCallback(async () => {
    await dispatch(common.ui.setLoading());
    await dispatch(hchair.orders.getTransactionOrderById(location.search.split('=')[1]));
    await dispatch(common.ui.clearLoading());
  }, [dispatch, location.search]);

  const handleChangeOrderStatus = async (payload) => {
    const response = await dispatch(hchair.orders.updateTransactionOrder(payload));

    if (response.success) {
      message.success('Order status changed successfully!');
      await dispatch(hchair.orders.getTransactionOrderById(location.search.split('=')[1]));
    }
  };

  const handleSendPayment = async (payload) => {
    const response = await dispatch(hchair.orders.sendPaymentEmail(payload));

    if (response.success) {
      message.success('Send payment email successfully!');
    }
  };

  useEffect(() => {
    handleGetTransactionOrderDetails();
  }, [handleGetTransactionOrderDetails]);

  return loading || orderDetail === null ? (
    <LoadComponent />
  ) : (
    <PageHeaderContainer showHeader header={<Header />}>
      <div className={styles.orderDetail}>
        {headerTabIndex === tabs[0].key && <CustomerInformation />}

        {headerTabIndex === tabs[1].key && (
          <ProductList
            onStatusChange={handleChangeOrderStatus}
            onSendPaymentClick={handleSendPayment}
          />
        )}

        {headerTabIndex === tabs[2].key && <DeliveryOrder />}

        {headerTabIndex === tabs[3].key && <PaymentRecords />}
      </div>
    </PageHeaderContainer>
  );
};

export default OrderDetailSection;
