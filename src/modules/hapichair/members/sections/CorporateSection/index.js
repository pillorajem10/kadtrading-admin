import React from 'react';

// antd
import { Col, Form, Input, Row } from 'antd';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';

// styling
import './index.less';

const CorporateSection = () => {
  return (
    <DetailsSectionContainer title="Corporate Information">
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Company Name" name={['corp', 'companyName']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="UEN (Unique Entity Number)" name={['corp', 'uen']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Title/Position" name={['corp', 'position']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Member ID" name="id">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Street No & Name / Building Name" name={['corp', 'address']} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item label="Floor Unit" name={['corp', 'unit']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Postal Code" name={['corp', 'postcode']} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={24}>
          <Form.Item label="Industry" name={['corp', 'industry']}>
            <Input />
          </Form.Item>
        </Col>
      </Row>




    </DetailsSectionContainer>
  );
};

export default CorporateSection;
