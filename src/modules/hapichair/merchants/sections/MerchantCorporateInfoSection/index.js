import React from 'react';

// antd
import { Col, Form, Input, Row, Switch } from 'antd';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';

const MerchantCorporateInfoSection = () => {
  return (
    <DetailsSectionContainer title="Step 2 - Corporate Information">
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label="Merchant Business Name"
            name="businessName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="UEN (Unique Entity Number)" name="uen" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Address" name="address">
        <Input />
      </Form.Item>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Postal Code" name="postcode">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Row gutter={8}>
            <Col span={1} />
            <Col span={10}>
              <Form.Item label="No GST" name="gst" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Verified Seller" name="verified" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={1} />
          </Row>
        </Col>
      </Row>
    </DetailsSectionContainer>
  );
};

export default MerchantCorporateInfoSection;
