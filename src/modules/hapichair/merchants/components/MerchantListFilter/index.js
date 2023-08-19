import React from 'react';

// antd
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const MerchantListFilter = () => {
  return (
    <div className="flex-center-start">
      <Form.Item label="Search" name="displayName">
        <Input allowClear placeholder="Merchant Name" />
      </Form.Item>
      <Form.Item label="Sort" name="sortBy">
        <Select style={{ width: 230 }}>
          <Option value="default">Default</Option>
          <Option value="merchantAsc">Merchant Name from A to Z</Option>
          <Option value="merchantDesc">Merchant Name from Z to A</Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default MerchantListFilter;
