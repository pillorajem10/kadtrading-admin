import React from 'react';
import { useHistory } from 'react-router-dom';

// sections
import OrderListSection from './sections/OrderListSection';
import OrderDetailSection from './sections/OrderDetailSection';

const Orders = () => {
  const history = useHistory();

  const { location } = history;

  if (location.search === '') return <OrderListSection />;

  return <OrderDetailSection />;
};

export default Orders;
