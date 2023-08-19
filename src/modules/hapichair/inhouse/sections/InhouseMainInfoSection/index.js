import React from 'react';

// antd
import { Col, Form, Input, Row } from 'antd';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';

const InhouseMainInfoSection = () => {
  return (
    <DetailsSectionContainer title="Details">
      <Form.Item label="Stock Number" name="stockNo" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Shape" name="shape" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Weight" name="weight" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Color" name="color" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Clarity" name="clarity" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        {/*
        <Col span={12}>
          <Form.Item label="Contact Number" required>
            <ContactNumberInput />
          </Form.Item>
        </Col>        
        */}
      </Row>
    </DetailsSectionContainer>
  );
};

export default InhouseMainInfoSection;
