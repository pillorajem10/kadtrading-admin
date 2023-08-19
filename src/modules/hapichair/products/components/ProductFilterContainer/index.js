import React from 'react';

// antd
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const ProductFilterContainer = () => {
  return (
    <div className="flex-center-start">
      <Form.Item label="Search" name="keyword">
        <Input placeholder="Enter keywords..." />
      </Form.Item>
      <Form.Item label="Search" name="searchName">
        <Select style={{ width: '155px' }}>
          <Option value="productName">Product Name</Option>
          <Option value="merchantName">Merchant</Option>
          <Option value="categoryName">Category</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Sort" name="sortBy">
        <Select style={{ width: '155px' }}>
          <Option value="default">Default</Option>
          <Option value="priceLowToHigh">Price low to high</Option>
          <Option value="priceHighToLow">Price high to low</Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default ProductFilterContainer;
