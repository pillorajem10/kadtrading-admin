import React from 'react';

// antd
import { Col, Form, Input, Row } from 'antd';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';
import ContactNumberInput from '@components/ContactNumberInput';

// styling
import './index.less';

const MainMemberInfoSection = ({ form }) => {
  const disableField = () => {
    const { id } = form.getFieldsValue();
    return id && id !== '';
  };

  return (
    <DetailsSectionContainer title="Member Overview">
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="First Name" name="fname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Last Name" name="lname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Email Address" name="email" rules={[{ required: true }]}>
            <Input disabled={disableField()} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Contact Number" required>
            <ContactNumberInput name="tel" />
          </Form.Item>
        </Col>
      </Row>
    </DetailsSectionContainer>
  );
};

export default MainMemberInfoSection;
