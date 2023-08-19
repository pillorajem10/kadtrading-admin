import React from 'react';

// antd
import { Col, Form, Input, InputNumber, Row } from 'antd';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';
import PriceTierSection from '../PriceTierSection';

const ProductPriceSection = ({ form, triggerCompare }) => {
  return (
    <DetailsSectionContainer title="Step 2 - Pricing">
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label="Unit"
            name="unit"
            rules={[{ required: true, message: 'Please enter unit!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Lot/Quantity"
            name="lotSize"
            rules={[{ required: true, message: 'Please enter lot/quantity!' }]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            label="Retail Price"
            name="retailPrice"
            rules={[{ required: true, message: 'Please enter retail price!' }]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="MOQ - Minimum Order Quantity" name="moq">
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>

      <PriceTierSection form={form} triggerCompare={triggerCompare}/>

    </DetailsSectionContainer>
  );
};

export default ProductPriceSection;
