import React from 'react';
import moment from 'moment';

// antd
import { Descriptions, Divider, Card, Table, Select, Button } from 'antd';

// redux
import { useSelector } from 'react-redux';

// hooks
import useComputation from '@hooks/useComputation';

// utils
import { formatPrice } from '@utils/methods';
import { productListColumn, orderStatuses } from '../../utils';

// styling
import styles from './index.module.less';

const ProductList = ({ onStatusChange, onSendPaymentClick }) => {
  const { orderDetail } = useSelector((state) => state.hchair.orders);
  const { shippingFee } = useComputation();

  return orderDetail.orders.map((order) => {
    const handleUpdateStatus = (value) => {
      const payload = {
        id: order.id,
        adminNote: order.adminNote,
        status: value,
      };
      onStatusChange(payload);
    };

    const handleSendPayment = () => {
      const payload = {
        orderId: order.id,
      };
      onSendPaymentClick(payload);
    };
    return (
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={order.merchantName}
        key={order.id}
        extra={
          <div>
            <span className="mr-8">Status:</span>
            <Select
              value={order.status}
              onChange={handleUpdateStatus}
              className={styles.orderStatusDropdown}
            >
              {orderStatuses.map((status) => (
                <Select.Option key={status.value} value={status.value}>
                  {status.label}
                </Select.Option>
              ))}
            </Select>
          </div>
        }
      >
        <Descriptions
          title="Information"
          className={styles.descriptionContainer}
          extra={
            <Button
              type="primary"
              onClick={handleSendPayment}
              disabled={order.status !== 'DELIVERED'}
            >
              Send Payment
            </Button>
          }
        >
          <Descriptions.Item label="ID">{order.id}</Descriptions.Item>
          <Descriptions.Item label="Order No.">{order.seqId}</Descriptions.Item>
          <Descriptions.Item label="Subtotal">{formatPrice(order.subTotal)}</Descriptions.Item>
          <Descriptions.Item label="Payment Terms">
            {order.paymentTerms ?? 'Net 30 days from the date of invoice unless otherwise stated.'}
          </Descriptions.Item>
          <Descriptions.Item label="Purchase Order No.">
            {order.deliveryOption?.poNo ?? '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Total">{formatPrice(order.total)}</Descriptions.Item>
          <Descriptions.Item label="Remarks">
            <div dangerouslySetInnerHTML={{ __html: order.remark ?? '-' }} />
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Delivery Options">
          <Descriptions.Item label="Name">{order.deliveryOption?.name}</Descriptions.Item>
          <Descriptions.Item label="Delivery Fee">
            {shippingFee(order.total, order.deliveryOption)}
          </Descriptions.Item>
          <Descriptions.Item label="Estimated Delivery Date">
            {moment(order.createTime)
              .add(order.deliveryOption?.minEddWeeks, 'w')
              .format('DD MMM YYYY')}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        {/* Product Table List */}
        <Table
          columns={productListColumn}
          dataSource={order.items}
          pagination={false}
          rowKey="id"
          className="order-details-section-table"
        />
      </Card>
    );
  });
};

export default ProductList;
