import React from 'react';

// antd
import { Form, Select } from 'antd';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';

const { Option } = Select;

const ProductStatusSection = () => {
  return (
    <DetailsSectionContainer title="General">
      <Form.Item label="Status" name="status">
        <Select>
          <Option value="UNPUBLISHED">Unpublished</Option>
          <Option value="PUBLISHED">Published</Option>
        </Select>
      </Form.Item>
    </DetailsSectionContainer>
  );
};

export default ProductStatusSection;
