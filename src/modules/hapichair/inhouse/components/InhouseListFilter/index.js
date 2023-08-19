import React from 'react';

// antd
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const InhouseListFilter = () => {
  return (
    <div className="flex-center-start">
      <Form.Item label="Search" name="displayName">
        <Input allowClear placeholder="Inhouse diamond name" />
      </Form.Item>
      <Form.Item label="Sort" name="sortBy">
        <Select style={{ width: 230 }}>
          <Option value="default">Default</Option>
          <Option value="merchantAsc">Inhouse Name from A to Z</Option>
          <Option value="merchantDesc">Inhouse Name from Z to A</Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default InhouseListFilter;
