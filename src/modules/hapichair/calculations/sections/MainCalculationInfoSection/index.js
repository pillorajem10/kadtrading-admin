import React from 'react';

// antd
import { Col, Form, Input, Row, Select } from 'antd';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';

// styling
import './index.less';

const { Option } = Select;

const MainCalculationInfoSection = () => {
  /*
	types: diamond, gemstone, product(setting)
	represent: globald, inhouse, setting
  */
  return (
    <DetailsSectionContainer title="">
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Represent" name="represent" rules={[{ required: true }]}>
            <Select placeholder="Select from list" allowClear={false}>
              <Option key={1} value="globald">Global Diamonds</Option>
              <Option key={2} value="inhouse">Inhouse Diamonds</Option>
              <Option key={3} value="setting">Settings</Option>              
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={8}>
          <Form.Item label="Type" name="dtype" rules={[{ required: true }]}>
            <Select placeholder="Select from list" allowClear={false}>
              <Option key={1} value="diamond">Diamonds</Option>
              <Option key={2} value="gemstone">Gemstone</Option>
              <Option key={3} value="product">Product</Option>              
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="GST (%)" extra="ex. 7% then input 0.07" name="gst" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Currency" name="currency" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={8}>
          <Form.Item label="Markup (%)" extra="ex. 17% then input 0.17" name="markup" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Shipping" name="shipping">
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Logistics" name="logistics">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={24}>
          <Form.Item label="Exchange Rates" extra="This will be used for computing prices." name="rates">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>            
    </DetailsSectionContainer>
  );
};

export default MainCalculationInfoSection;
