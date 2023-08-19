import React from 'react';
import moment from 'moment';

// antd
import { Button, message, Popconfirm, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// constants
import { dateFormat } from '@constants';

// components
import AttachmentUploader from '@components/AttachmentUploader';

// utils
import { formatPrice } from '@utils/methods';

const DeliveryOrder = () => {
  const dispatch = useDispatch();
  const {
    hchair: {
      orders: { orderDetail },
    },
  } = useSelector((state) => state);

  const createDeliveryOrder = async (payload) => {
    const success = await dispatch(hchair.orders.createNewDeliveryOrder(payload));

    if (success) {
      message.success('Delivery order uploaded successfully!');
    }
  };

  const handleDeleteDO = async (deliveryOrder) => {
    const success = await dispatch(hchair.orders.removeDeliveryOrder(deliveryOrder));

    if (success) {
      message.success('Delivery order removed successfully!');
    }
  };

  return (
    <div>
      <Table
        rowKey="id"
        columns={[
          { title: 'Order Number', dataIndex: 'seqId' },
          { title: 'Merchant', dataIndex: 'merchantName' },
          {
            title: 'Total Amount',
            key: 'total',
            dataIndex: 'total',
            render: (data) => formatPrice(data),
          },
          {
            title: 'Document',
            dataIndex: 'deliveryOrders',
            render: (deliveryOrders) => {
              return deliveryOrders.map((deliveryOrder) => (
                <div key={deliveryOrder.id} className="flex-center-space-between mb-8">
                  <a href={deliveryOrder.url} target="_blank" rel="noopener noreferrer" download>
                    {deliveryOrder.name}
                  </a>
                  <Popconfirm
                    title="Confirm to delete this D.O?"
                    onConfirm={() => handleDeleteDO(deliveryOrder)}
                  >
                    <Button
                      icon={<DeleteOutlined />}
                      ghost
                      type="danger"
                      shape="circle"
                      size="small"
                    />
                  </Popconfirm>
                </div>
              ));
            },
          },
          {
            title: 'Date Uploaded',
            dataIndex: 'deliveryOrders',
            render: (record) => {
              return <p>{moment(record.createTime).format(dateFormat.displayDateTime)}</p>;
            },
          },
          {
            title: '',
            dataIndex: '',
            render: (record) => {
              return (
                <AttachmentUploader
                  multiple
                  container="product"
                  prefix="pdoc"
                  onUploadSuccess={({ url, filename }) =>
                    createDeliveryOrder({ orderId: record.id, url, name: filename })
                  }
                  buttonProps={{
                    type: 'primary',
                  }}
                  uploadProps={{
                    showUploadList: false,
                  }}
                />
              );
            },
          },
        ]}
        dataSource={orderDetail.orders}
      />
    </div>
  );
};

export default DeliveryOrder;
