import React from 'react';

// antd
import { Col, Form, Input, Row, Select } from 'antd';

// constants
import { countryCodes } from '@constants';

const { Option } = Select;

const ContactNumberInput = ({ name = 'phone' }) => {
  return (
    <Row gutter={8}>
      <Col span={12}>
        <Form.Item
          noStyle
          name="countryCode"
          rules={[{ required: true, message: 'Country Code is required' }]}
        >
          <Select placeholder="Country Code" allowClear={false}>
            {countryCodes.map((countryCode) => (
              <Option key={countryCode.Iso} value={countryCode.Iso}>
                {countryCode.Iso} {countryCode.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          noStyle
          name={name}
          rules={[{ required: true, message: 'Phone Number is required' }]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default ContactNumberInput;
