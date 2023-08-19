import React from 'react';

// antd
import { Form, Input, Select } from 'antd';

// styling
import './index.less';

const { Option } = Select;

const OrderListFilterContainer = () => {
  return (
    <div className="flex-center-start">
      <Form.Item label="Search" name="keyword" style={{ marginRight: 0 }}>
        <Input placeholder="Enter keyword..." />
      </Form.Item>
      <Form.Item name="searchName">
        <Select>
          <Option value="companyName">Company Name</Option>
          <Option value="projectName">Project Name</Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default OrderListFilterContainer;
