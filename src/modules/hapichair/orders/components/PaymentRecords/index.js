import React from 'react';

// antd
import { Table } from 'antd';

// redux
import { useSelector } from 'react-redux';

// utils
import { formatPrice } from '@utils/methods';

const columns = [
  {
    title: 'Order Number',
    dataIndex: 'seqId',
  },
  {
    title: 'Merchant',
    dataIndex: 'merchantName',
  },
  {
    title: 'Amount',
    dataIndex: 'paymentAmount',
    render: (paymentAmount) => formatPrice(paymentAmount),
  },
  {
    title: 'Reference No.',
    dataIndex: 'paymentRef',
  },
];

const PaymentRecords = () => {
  const {
    hchair: {
      orders: { orderDetail },
    },
  } = useSelector((state) => state);

  const paymentRecords = orderDetail.orders?.flatMap(({ merchantName, seqId, payments }) =>
    payments.map((payment) => ({ ...payment, merchantName, seqId })),
  );

  return <Table columns={columns} dataSource={paymentRecords} />;
};

export default PaymentRecords;
