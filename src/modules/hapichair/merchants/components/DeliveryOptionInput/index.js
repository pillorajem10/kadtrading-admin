import React from 'react';

// antd
import { Button, Col, Divider, Form, Input, InputNumber, Row } from 'antd';

const DeliveryOptionInput = ({ field, onRemove }) => {
  return (
    <>
      <Form.Item
        {...field}
        label="Delivery Option Title"
        fieldKey={[field.fieldKey, '']}
        name={[field.name, 'name']}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>






      <Row gutter={8}>
        <Col span={24}>
          <Form.Item
              {...field}
              label="Shipping ($)"
              // fieldKey={[field.fieldKey, '']}
              name={[field.name, 'amount']}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
        </Col>
      </Row>

 
















      {/*
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            {...field}
            label="Below Limit ($)"
            fieldKey={[field.fieldKey, '']}
            name={[field.name, 'amount']}
          >
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...field}
            label="Above Limit ($)"
            fieldKey={[field.fieldKey, '']}
            name={[field.name, 'freeShippingExtra']}
          >
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>      

      <Row gutter={8}>
        <Col span={8}>
          <Form.Item
            {...field}
            label="Amount Limit ($)"
            fieldKey={[field.fieldKey, '']}
            name={[field.name, 'freeShippingAbove']}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...field}
            label="Min Week Value"
            fieldKey={[field.fieldKey, '']}
            name={[field.name, 'minEddWeeks']}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue, setFields }) => ({
                validator: (rule, value) => {
                  const maxEddWeeks = getFieldValue(['deliveryOptions', field.name, 'maxEddWeeks']);
                  if (!value) return Promise.resolve();

                  if (value >= maxEddWeeks)
                    return Promise.reject(Error('Min Week Value must be less than Max Week Value'));

                  setFields([{ name: ['deliveryOptions', field.name, 'maxEddWeeks'], errors: [] }]);
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...field}
            label="Max Week Value"
            fieldKey={[field.fieldKey, '']}
            name={[field.name, 'maxEddWeeks']}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue, setFields }) => ({
                validator: (rule, value) => {
                  const minEddWeeks = getFieldValue(['deliveryOptions', field.name, 'minEddWeeks']);

                  if (!value) return Promise.resolve();

                  if (value <= minEddWeeks)
                    return Promise.reject(
                      Error('Max Week Value must be greater than Min Week Value'),
                    );

                  setFields([{ name: ['deliveryOptions', field.name, 'minEddWeeks'], errors: [] }]);

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>
      */}



      <div className="align-right">
        <Button type="danger" onClick={onRemove}>
          Remove
        </Button>
      </div>

      <Divider />
    </>
  );
};

export default DeliveryOptionInput;
