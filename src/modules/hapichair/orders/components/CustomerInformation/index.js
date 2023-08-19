import React from 'react';
import moment from 'moment';

// antd
import { Descriptions, Divider } from 'antd';

// redux
import { useSelector } from 'react-redux';

const paymentMethod = (method) => {
  let pMethod = '-';
  if (method && method === 'BANK_TRANSFER') {
    pMethod = 'BANK TRANSFER/ TT';
  }
  return pMethod;
};

const CustomerInformation = () => {
  const { orderDetail } = useSelector((state) => state.hchair.orders);

  return (
    <>
      {/* Customer Information */}
      <Descriptions title="Customer Information">
        <Descriptions.Item label="Name">{orderDetail.contacts.hqContact}</Descriptions.Item>
        <Descriptions.Item label="Contact Number">
          {`${orderDetail.contacts.hqCountryCode} ${orderDetail.contacts.hqContactNo}`}
        </Descriptions.Item>
        <Descriptions.Item label="Create Time">
          {moment(orderDetail.createTime).format('DD/MM/YYYY hh:mma')}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      {/* Billing Information */}
      <Descriptions title="Invoice Information">
        <Descriptions.Item label="Payment Gateway">
          {orderDetail.paymentGateway || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Payment Method">{paymentMethod(orderDetail.paymentMethod)}</Descriptions.Item>
        <Descriptions.Item label="Unit No.">{orderDetail.invoiceAddress?.unit}</Descriptions.Item>
        <Descriptions.Item label="Address">{orderDetail.invoiceAddress?.address}</Descriptions.Item>
        <Descriptions.Item label="Postcode">
          {orderDetail.invoiceAddress?.postcode}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      {/* Delivery Information */}
      <Descriptions title="Site Information">
        <Descriptions.Item label="Site Contact">{orderDetail.contacts.siteContact}</Descriptions.Item>
        <Descriptions.Item label="Site Contact Number">
          {`${orderDetail.contacts.siteCountryCode} ${orderDetail.contacts.siteContactNo}`}
        </Descriptions.Item>
        <Descriptions.Item label="Project Code">{orderDetail.projectCode}</Descriptions.Item>
        <Descriptions.Item label="Project Name">{orderDetail.projectName}</Descriptions.Item>
        <Descriptions.Item label="Unit No.">{orderDetail.siteAddress?.unit}</Descriptions.Item>
        <Descriptions.Item label="Address">
          {orderDetail.siteAddress?.address}
        </Descriptions.Item>
        <Descriptions.Item label="Postcode">
          {orderDetail.siteAddress?.postcode}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default CustomerInformation;
