import React from 'react';
import moment from 'moment';

// hooks
import useTransaction from '@hooks/useTransaction';

// utils
import { formatPrice, getRandomString, tableStringSorter } from '@utils/methods';

import '../index.less';

export const statusList = [
  {
    status: 'SUCCEEDED',
    name: 'Succeeded',
    color: 'green',
  },
  {
    status: 'PENDING',
    name: 'Pending',
    color: 'orange',
  },
  {
    status: 'EXPIRED',
    name: 'Expired',
    color: 'purple',
  },
  {
    status: 'UN_CAPTURED',
    name: 'Uncaptured',
    color: 'red',
  },
  {
    status: 'FULL_REFUND',
    name: 'Full Refund',
    color: 'blue',
  },
  {
    status: 'PARTIAL_REFUND',
    name: 'Partial Refund',
    color: 'geekblue',
  },
];

export const orderListColumn = [
  {
    title: 'Transaction ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Date',
    dataIndex: 'createTime',
    key: 'createTime',
    sorter: (a, b) => a.createTime - b.createTime,
    render: (createdTime) => <p>{moment(createdTime).format('DD/MM/YYYY hh:mma')}</p>,
  },
  {
    title: 'Company Name',
    dataIndex: 'companyName',
    key: 'companyName',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'companyName' }),
  },
  {
    title: 'Project Name',
    dataIndex: 'projectName',
    key: 'projectName',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'projectName' }),
  },
  {
    title: 'Total Payment',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a, b) => a.amount - b.amount,
    render: (amount) => <p>{formatPrice(amount)}</p>,
  },
];

const createTitleValue = (title, value, id) => {
  return (
    <div key={id} className="prod-list-column-title-value">
      <span style={{ width: 100 }}>{title}</span>
      <span>{value}</span>
    </div>
  );
};

const TotalAmount = ({ item }) => {
  const { price } = useTransaction(item);
  return <p>{formatPrice(price)}</p>;
};

export const productListColumn = [
  {
    title: 'Product Details',
    render: (record) => {
      return (
        <div className="prod-list-column-container">
          <img className="prod-list-column-img" src={record.image} alt="" />
          <div className="prod-list-column-right">
            <span>{record.productName}</span>
            <span className="prod-list-column-sku">{`SKU: ${record.sku || '-'}`}</span>
            <br />
            {createTitleValue('Colour', record.variantName, getRandomString())}
            {record.options.map((opt, idx) => createTitleValue(opt.group, opt.name, idx))}
          </div>
        </div>
      );
    },
  },
  {
    title: 'Quantity',
    className: 'prod-list-column-f',
    render: (record) => {
      const { qty, unit } = record;
      return (
        <div className="prod-list-column-right">
          <span>
            {qty} {`${unit}`}
          </span>
        </div>
      );
    },
  },
  {
    title: 'Unit',
    className: 'prod-list-column-f',
    render: (record) => {
      const { lotSize, price, unit, variantPrice } = record;
      return (
        <div className="prod-list-column-right">
          <span>
            {formatPrice(price)} {lotSize > 1 ? `/${lotSize} ${unit}` : `/${unit}`}
          </span>
          <br />
          <br />
          <span>
            {formatPrice(variantPrice)} {`/${unit}`}
          </span>
          {record.options.map((opt, idx) => (
            <span key={idx}>
              {formatPrice(opt.price)} {`/${unit}`}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    title: 'Total Amount',
    className: 'prod-list-column-f',
    render: (record) => <TotalAmount item={record} />,
  },
];

export const mapValuesToSearchPayload = (values) => {
  const { searchName, keyword, ...rest } = values;
  return { [searchName]: keyword, ...rest };
};

export const orderStatuses = [
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Delivered',
    value: 'DELIVERED',
  },
  {
    label: 'Paid',
    value: 'PAID',
  },
  {
    label: 'Cancelled',
    value: 'CANCELLED',
  },
];

export const tabs = [
  {
    key: 'information',
    name: 'Information',
  },
  {
    key: 'productList',
    name: 'Product List',
  },
  {
    key: 'deliveryOrder',
    name: 'Delivery Order',
  },
  {
    key: 'paymentRecords',
    name: 'Payment Records',
  },
];
