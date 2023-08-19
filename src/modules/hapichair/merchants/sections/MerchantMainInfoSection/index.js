import React from 'react';

// antd
import { Col, Form, Input, Row } from 'antd';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';
import ContactNumberInput from '@components/ContactNumberInput';

const MerchantMainInfoSection = () => {
  return (
    <DetailsSectionContainer title="Step 1 - Main Merchant Info">
      <Form.Item label="Site Display Name" name="displayName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Email Address" name="companyEmail" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Contact Number" required>
            <ContactNumberInput />
          </Form.Item>
        </Col>
      </Row>
    </DetailsSectionContainer>
  );
};

export default MerchantMainInfoSection;
