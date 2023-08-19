import React from 'react';

// antd
import { Col, Form, InputNumber, Row, Select } from 'antd';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';

const ProductFilteringAttributesSection = () => {
  return (
    <DetailsSectionContainer tile={null}>
      <div className="mb-16">
        <span>Search & Filters</span>
      </div>
      <Form.Item label="Dimensions (mm)">

        <Form.Item label={<span style={{ fontSize: 12 }}>Width / Length</span>}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name="minWidth" noStyle>
                <InputNumber placeholder="Min" precision={2} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="maxWidth" noStyle>
                <InputNumber placeholder="Max" precision={2} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>


        <Form.Item label={<span style={{ fontSize: 12 }}>Depth</span>}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name="minDepth" noStyle>
                <InputNumber placeholder="Min" precision={2} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="maxDepth" noStyle>
                <InputNumber placeholder="Max" precision={2} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>


        <Form.Item label={<span style={{ fontSize: 12 }}>Height</span>}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name="minHeight" noStyle>
                <InputNumber placeholder="Min" precision={2} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="maxHeight" noStyle>
                <InputNumber placeholder="Max" precision={2} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label={<span style={{ fontSize: 12 }}>Thickness</span>}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name="minThickness" noStyle>
                <InputNumber placeholder="Min" precision={2} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="maxThickness" noStyle>
                <InputNumber placeholder="Max" precision={2} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form.Item>

      <Form.Item name="materials" label="Material Filter Group">
        <Select allowClear mode="tags" />
      </Form.Item>

      <Form.Item name="tags" label="Tags">
        <Select allowClear mode="tags" />
      </Form.Item>


    </DetailsSectionContainer>
  );
};

export default ProductFilteringAttributesSection;
