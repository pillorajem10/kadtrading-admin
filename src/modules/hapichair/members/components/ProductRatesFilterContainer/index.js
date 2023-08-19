import React from 'react';

// antd
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const ProductRatesFilterContainer = () => {
  return (
    <div className="flex-center-start">
      <Form.Item hidden name="corpId">
        <Input />
      </Form.Item>
      <Form.Item shouldUpdate noStyle>
        {({ submit }) => (
          <Form.Item label="Search" name="keyword">
            <Input placeholder="Enter keywords..." onPressEnter={submit} />
          </Form.Item>
        )}
      </Form.Item>
      <Form.Item label="Search" name="searchName">
        <Select style={{ width: '155px' }}>
          <Option value="productName">Product Name</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Sort" name="sortBy">
        <Select style={{ width: '155px' }}>
          <Option value="default">Default</Option>
          <Option value="productNameAsc">Product name A to Z</Option>
          <Option value="productNameDesc">Product name Z to A</Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default ProductRatesFilterContainer;
