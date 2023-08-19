import React from 'react';

// antd
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const MemberFilterContainer = () => {
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
          <Option value="companyName">Company Name</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Sort" name="sortBy">
        <Select style={{ width: '200px' }}>
          <Option value="default">Default</Option>
          <Option value="companyNameAsc">Company name A to Z</Option>
          <Option value="companyNameDesc">Company name Z to A</Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default MemberFilterContainer;
