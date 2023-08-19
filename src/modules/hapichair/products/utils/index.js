import React from 'react';

// antd
import { Space, Popconfirm, Row, Button } from 'antd';
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

// picture
import noProductImage from '@images/no-product-skeleton.svg';

// utils
import { formatPrice, normalizeBreakTagToString } from '@utils/methods';

export const productOptionColumn = [
  {
    title: 'Group Title',
    dataIndex: 'groupTitle',
  },
  {
    title: 'Title',
    dataIndex: 'optionTitle',
  },
  {
    title: 'Price +/-',
    dataIndex: 'optionPrice',
    render: (record) => formatPrice(record),
  },
];

export const sortOptions = {
  default: {
    sortBy: 'updateTime',
    sortOrder: 'desc',
  },
  priceLowToHigh: {
    sortBy: 'price',
    sortOrder: 'asc',
  },
  priceHighToLow: {
    sortBy: 'price',
    sortOrder: 'asc',
  },
};

export const productListColumns = (selectProduct, updateProduct, cloneProduct, removeProduct) => [
  {
    title: '',
    dataIndex: 'image',
    key: 'image',
    render: (image) => {
      return <img src={image || noProductImage} alt="" height={48} width={48} />;
    },
  },
  {
    title: 'Product',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: ({ _id, name }) => {
      return (
        <div style={{ cursor: 'pointer' }} onClick={(e) => selectProduct(e, _id)}>
          {name}
        </div>
      );
    },
  },
  {
    title: 'Category',
    dataIndex: 'categories',
    key: 'categories',
    render: (record) => {
      const category = [];
      record.map((ctgy, idx) => {
        category.push(
          <div
            key={idx}
            style={{
              fontSize: 11,
              width: 100,
              background: '#f3f3f3',
              borderRadius: 99,
              padding: '2px 14px',
            }}
          >
            {ctgy.name}
          </div>,
        );
        return ctgy;
      });
      return <Space direction="vertical">{category}</Space>;
    },
  },
  {
    title: 'Merchant',
    dataIndex: 'merchantDetails',
    sorter: (a, b) => a.displayName.localeCompare(b.displayName),
    render: ({ displayName }) => displayName,
  },
  {
    title: 'MOQ',
    dataIndex: 'moq',
    key: 'moq',
    sorter: (a, b) => a.moq - b.moq,
  },
  {
    title: 'Qty/Unit',
    dataIndex: 'unit',
    key: 'unit',
    sorter: (a, b) => a.unit.localeCompare(b.unit),
  },
  {
    title: 'Selling Price',
    dataIndex: 'retailPrice',
    key: 'retailPrice',
    sorter: (a, b) => a.retailPrice - b.retailPrice,
    render: (record) => formatPrice(record),
  },
  {
    title: 'Actions',
    dataIndex: '',
    key: 'actions',
    render: (record) => {
      const { _id } = record;

      return (
        <Row>
          <Popconfirm
            placement="topRight"
            title="Are you sure want to clone this product?"
            onConfirm={(event) => {
              event.stopPropagation();
              cloneProduct(_id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<CopyOutlined />}
              style={{ marginRight: 10 }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          </Popconfirm>

          <Popconfirm
            placement="topRight"
            title="Are you sure want to remove this product?"
            onConfirm={(event) => {
              event.stopPropagation();
              removeProduct(_id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          </Popconfirm>
        </Row>
      );
    },
  },
];

export const attributeColumnList = (onDelete, onEdit) => [
  {
    title: 'Name',
    dataIndex: 'name',
    editable: true,
    width: '30%',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    editable: true,
    width: '50%',
  },
  {
    title: '',
    width: '20%',
    render: (record) => (
      <>
        <Button
          className="mr-8"
          icon={<DeleteOutlined />}
          type="danger"
          ghost
          onClick={() => onDelete(record)}
        />
        <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
      </>
    ),
  },
];

export const defaultDescription = {
  title: '',
  content: '',
};

export const mapDetailsToValues = (productDetails) => {
  const values = {
    ...productDetails,
    descriptions: productDetails?.descriptions?.map((desc) => ({
      ...desc,
      content: normalizeBreakTagToString(desc.content),
    })),
    labels: productDetails?.labels.map((label) => label.id),
  };
  return values;
};

export const mapSearchPayload = (values) => {
  const { searchName, keyword, sortBy, ...rest } = values;

  const sortOption = sortOptions[sortBy];
  if (keyword) {
    return { [searchName]: keyword, ...sortOption, ...rest };
  }
  return { ...sortOption, ...rest };
};
