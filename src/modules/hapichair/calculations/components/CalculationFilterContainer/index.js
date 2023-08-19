import React from 'react';

// antd
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const CalculationFilterContainer = () => {
  return (
    <div className="flex-center-start">
      <Form.Item shouldUpdate noStyle>
        {({ submit }) => (
          <Form.Item label="Search" name="keyword">
            <Input placeholder="Enter keywords..." onPressEnter={submit} />
          </Form.Item>
        )}
      </Form.Item>
      <Form.Item label="Search" name="searchName">
        <Select style={{ width: '155px' }}>
          <Option value="name">Name</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Sort" name="sortBy">
        <Select style={{ width: '200px' }}>
          <Option value="default">Default</Option>
          <Option value="nameAsc">Name A to Z</Option>
          <Option value="nameDesc">Name Z to A</Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default CalculationFilterContainer;
