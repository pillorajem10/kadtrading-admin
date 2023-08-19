import React from 'react';

// antd
import { Col, Form, Input, Row } from 'antd';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';
import MerchantDropdown from '@components/MerchantDropdown';
import CategoryDropdown from '@components/CategoryDropdown';

const ProductMainInfoSection = () => {
  return (
    <DetailsSectionContainer title="Step 1 - Main Product Info">
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label="Merchant"
            name="merchantId"
            rules={[{ required: true, message: 'Please select a merchant!' }]}
          >
            <MerchantDropdown platform="2B" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Brand" name="brand">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label="Title"
            name="name"
            rules={[{ required: true, message: 'Please enter product name!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Category"
            name="categories"
            rules={[{ required: true, message: 'Please choose at least one category!' }]}
          >
            <CategoryDropdown />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Video Link" name="video">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Main SKU" name="sku">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </DetailsSectionContainer>
  );
};

export default ProductMainInfoSection;
