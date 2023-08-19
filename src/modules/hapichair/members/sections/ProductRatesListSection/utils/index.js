import React from 'react';

// antd
import { Switch, Popconfirm, Row, Button, Typography } from 'antd';

// antd icons
import { DeleteOutlined } from '@ant-design/icons';

// utils
import { formatPrice, tableStringSorter } from '@utils/methods';

// picture
import noProductImage from '@images/no-product-skeleton.svg';

import './index.less';

const { Text } = Typography;

export const productRatesListColumn = (handleClick) => [
  {
    title: '',
    dataIndex: 'image',
    key: 'image',
    render: (image) => (
      <>
        <img className="product-rate-tier-img" src={image || noProductImage} alt="" />
      </>
    ),
    width: 80,
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'name' }),
  },
  {
    title: 'Selling Price',
    dataIndex: 'retailPrice',
    key: 'retailPrice',
    sorter: (a, b) => a.retailPrice - b.retailPrice,
    render: (record) => formatPrice(record),
  },
  {
    title: 'Exclusive Price',
    render: (record) => {
      return (
        <>
          {record.price !== null ? (
            <Text style={{ cursor: 'pointer' }} onClick={() => handleClick(record)} type="success">
              {formatPrice(record.price)}
            </Text>
          ) : (
            <Text style={{ cursor: 'pointer' }} onClick={() => handleClick(record)} type="danger">
              Not Set
            </Text>
          )}
        </>
      );
    },
  },
  {
    title: 'Tier 1',
    width: 160,
    render: (record) => {
      const tier = record.priceTiers.find((pTier) => pTier.seqId === 1);
      const notSet = <Text type="danger">Not Set</Text>;
      if (!tier) return null;
      return (
        <div>
          <div className="product-rate-tier">
            <Text strong style={{ flex: 1 }}>{`${tier.minQty} - ${
              tier.maxQty !== null ? tier.maxQty : 'More'
            }:`}</Text>
            <Text>{tier.retailPrice !== null ? formatPrice(tier.retailPrice) : notSet}</Text>
          </div>
          <div style={{ fontSize: 12 }}>
            {tier.price !== null ? <Text type="success">{formatPrice(tier.price)}</Text> : notSet}
          </div>
        </div>
      );
    },
  },
  {
    title: 'Tier 2',
    width: 160,
    render: (record) => {
      const tier = record.priceTiers.find((pTier) => pTier.seqId === 2);
      const notSet = <Text type="danger">Not Set</Text>;
      if (!tier) return null;
      return (
        <div>
          <div className="product-rate-tier">
            <Text strong style={{ flex: 1 }}>{`${tier.minQty} - ${
              tier.maxQty !== null ? tier.maxQty : 'More'
            }:`}</Text>
            <Text>{tier.retailPrice !== null ? formatPrice(tier.retailPrice) : notSet}</Text>
          </div>
          <div style={{ fontSize: 12 }}>
            {tier.price !== null ? <Text type="success">{formatPrice(tier.price)}</Text> : notSet}
          </div>
        </div>
      );
    },
  },
  {
    title: 'Tier 3',
    width: 160,
    render: (record) => {
      const tier = record.priceTiers.find((pTier) => pTier.seqId === 3);
      const notSet = <Text type="danger">Not Set</Text>;
      if (!tier) return null;
      return (
        <div>
          <div className="product-rate-tier">
            <Text strong style={{ flex: 1 }}>{`${tier.minQty} - ${
              tier.maxQty !== null ? tier.maxQty : 'More'
            }:`}</Text>
            <Text>{tier.retailPrice !== null ? formatPrice(tier.retailPrice) : notSet}</Text>
          </div>
          <div style={{ fontSize: 12 }}>
            {tier.price !== null ? <Text type="success">{formatPrice(tier.price)}</Text> : notSet}
          </div>
        </div>
      );
    },
  },
  {
    title: 'Tier 4',
    width: 160,
    render: (record) => {
      const tier = record.priceTiers.find((pTier) => pTier.seqId === 4);
      const notSet = <Text type="danger">Not Set</Text>;
      if (!tier) return null;
      return (
        <div>
          <div className="product-rate-tier">
            <Text strong style={{ flex: 1 }}>{`${tier.minQty} - ${
              tier.maxQty !== null ? tier.maxQty : 'More'
            }:`}</Text>
            <Text>{tier.retailPrice !== null ? formatPrice(tier.retailPrice) : notSet}</Text>
          </div>
          <div style={{ fontSize: 12 }}>
            {tier.price !== null ? <Text type="success">{formatPrice(tier.price)}</Text> : notSet}
          </div>
        </div>
      );
    },
  },
];

export const productRatesColumn = [
  {
    title: '',
    dataIndex: 'image',
    alias: 'image',
    key: 'image',
    render: (image) => (
      <>
        <img className="product-rate-tier-img" src={image || noProductImage} alt="" />
      </>
    ),
    width: 80,
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
    alias: 'name',
    key: 'name',
  },
  {
    title: 'Selling Price',
    dataIndex: 'retailPrice',
    alias: 'retailPrice',
    key: 'retailPrice',
    render: (record) => formatPrice(record),
  },
  {
    title: 'Exclusive Price',
    width: 160,
    alias: 'price',
    render: (record) => {
      return (
        <div>
          <div />
          <div className="product-rate-col-modal">
            <Text>&nbsp;</Text>
            <Text>
              {record.price !== null ? formatPrice(record.price) : formatPrice(record.retailPrice)}
            </Text>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Tier 1',
    alias: 'pricetier1',
    width: 160,
    render: (record) => {
      const tier = record.priceTiers.find((pTier) => pTier.seqId === 1);
      if (!tier) return null;
      return (
        <div>
          <div />
          <div className="product-rate-col-modal">
            <Text>&nbsp;</Text>
            <Text>
              {tier.retailPrice !== null ? formatPrice(tier.retailPrice) : formatPrice(0)}
            </Text>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Tier 2',
    alias: 'pricetier2',
    width: 160,
    render: (record) => {
      const tier = record.priceTiers.find((pTier) => pTier.seqId === 2);
      if (!tier) return null;
      return (
        <div>
          <div />
          <div className="product-rate-col-modal">
            <Text>&nbsp;</Text>
            <Text>
              {tier.retailPrice !== null ? formatPrice(tier.retailPrice) : formatPrice(0)}
            </Text>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Tier 3',
    alias: 'pricetier3',
    width: 160,
    render: (record) => {
      const tier = record.priceTiers.find((pTier) => pTier.seqId === 3);
      if (!tier) return null;
      return (
        <div>
          <div />
          <div className="product-rate-col-modal">
            <Text>&nbsp;</Text>
            <Text>
              {tier.retailPrice !== null ? formatPrice(tier.retailPrice) : formatPrice(0)}
            </Text>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Tier 4',
    alias: 'pricetier4',
    width: 160,
    render: (record) => {
      const tier = record.priceTiers.find((pTier) => pTier.seqId === 4);
      if (!tier) return null;
      return (
        <div>
          <div />
          <div className="product-rate-col-modal">
            <Text>&nbsp;</Text>
            <Text>
              {tier.retailPrice !== null ? formatPrice(tier.retailPrice) : formatPrice(0)}
            </Text>
          </div>
        </div>
      );
    },
  },
];

export const memberListColumn = (updateMember, removeMember) => [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    sorter: (a, b) => a.firstName.length - b.firstName.length,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    sorter: (a, b) => a.lastName.length - b.lastName.length,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: 'Company',
    sorter: (a, b) => a.corp.companyName.length - b.corp.companyName.length,
    render: (record) => {
      return <>{(record.corp && record.corp) !== null ? record.corp.companyName : ''}</>;
    },
  },
  {
    title: 'Status',
    render: (record) => {
      return <>{(record.corp && record.corp) !== null ? 'Corporate' : ''}</>;
    },
  },
  {
    title: 'VIP',
    sorter: (a, b) => a.vip.length - b.vip.length,
    render: (record) => {
      const { vip, id } = record;
      const onChange = (checked, evt) => {
        evt.stopPropagation();
        const payload = { id, vip: checked };
        updateMember(payload);
      };

      return <Switch checked={vip} onChange={onChange} />;
    },
  },
  {
    title: 'Total Spents',
    dataIndex: 'totalSpent',
    key: 'totalSpent',
    sorter: (a, b) => a.totalSpent.length - b.totalSpent.length,
    render: (record) => formatPrice(record),
  },
  {
    title: '',
    dataIndex: '',
    key: 'actions',
    render: (record) => {
      const { id } = record;
      const handleCancel = (evt) => {
        evt.stopPropagation();
      };
      return (
        <Row>
          <Popconfirm
            placement="topRight"
            title="Are you sure want to remove this member?"
            onConfirm={() => removeMember(id)}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <Button onClick={(e) => e.stopPropagation()} icon={<DeleteOutlined />} />
          </Popconfirm>
        </Row>
      );
    },
  },
];

export const sortList = {
  default: { filter: { sortBy: 'updateTime', sortOrder: 'desc' }},
  productNameAsc: { filter: { sortBy: 'name', sortOrder: 'asc' }},
  productNameDesc: { filter: { sortBy: 'name', sortOrder: 'desc' }},
};

export const mapSearchPayload = (values) => {
  const { searchName, keyword, sortBy, ...rest } = values;

  const sortOption = sortList[sortBy]?.filter;

  if (keyword) {
    return { [searchName]: keyword, ...sortOption, ...rest };
  }
  return { ...sortOption, ...rest };
};

export const tableKey = 'productRatesListTable2B';
