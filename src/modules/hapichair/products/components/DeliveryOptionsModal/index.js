import React, { useState } from 'react';

// antd
import { Button, Col, Divider, Form, InputNumber, Row, Select } from 'antd';

// redux
import { useSelector } from 'react-redux';

// utils
import { formatPrice } from '@utils/methods';

// components
import ModalActionButtons from '../ModalActionButtons';

// styling
import styles from './index.module.less';

const DeliveryOptionsModal = ({ deliveryOption = {}, onCancel, onSave, onDelete }) => {
  const { deliveryOptions, merchantDeliveryOptions } = useSelector((state) => state.hchair.products);
  const mergedDeliveryOptionList = merchantDeliveryOptions?.map((deliveryOpt) => {
    const override = deliveryOptions?.find(
      (overrideDeliveryOpt) => overrideDeliveryOpt.sourceId === deliveryOpt.id,
    );

    if (override) return { ...deliveryOpt, ...override };

    // remap merchant delivery option {id} to {sourceId}
    // {id} of this list should be {id} of DeliveryOptionOverride entity
    const { id, ...restDeliveryOpt } = deliveryOpt;
    return { ...restDeliveryOpt, sourceId: deliveryOpt.id };
  });

  const [form] = Form.useForm();
  const [selectedDeliveryOpt, setSelectedDeliveryOpt] = useState(deliveryOption);

  const handleSave = (values) => {
    if (!selectedDeliveryOpt) {
      form.setFields([
        {
          name: 'deliveryMethod',
          errors: ['Please choose a delivery method'],
        },
      ]);
      return;
    }

    const { deliveryMethod, ...restValues } = values;
    const newDeliveryOption = { ...selectedDeliveryOpt, ...deliveryOption, ...restValues };

    onSave(newDeliveryOption);
  };

  const handleSelectDeliveryOpt = (value) => {
    const deliveryOpt = mergedDeliveryOptionList.find((opt) => opt.name === value);
    setSelectedDeliveryOpt(deliveryOpt);

    if (deliveryOpt)
      form.setFieldsValue({
        ...deliveryOpt,
      });

    form.setFields([
      {
        name: 'deliveryMethod',
        errors: [],
      },
    ]);
  };

  const initialValues = { ...deliveryOption, deliveryMethod: selectedDeliveryOpt?.name };

  return (
    <div className={styles.container}>
      <ModalActionButtons onCancel={onCancel} onSave={form.submit} />
      <Divider />

      <Form layout="vertical" form={form} initialValues={initialValues} onFinish={handleSave}>
        <Form.Item label="Delivery Option" name="deliveryMethod">
          <Select
            value={selectedDeliveryOpt?.name}
            onChange={handleSelectDeliveryOpt}
            optionLabelProp="title"
          >
            {mergedDeliveryOptionList?.map((opt) => (
              <Select.Option value={opt.name} key={opt.sourceId} title={opt.name}>
                <Row align="middle">
                  <Col span={14}>
                    <span>{opt.name}</span>
                  </Col>
                  <Col span={10}>
                    <Row className={styles.deliveryDetailsContainer}>
                      <Col span={16}>
                        <span>Delivery Amount</span>
                      </Col>
                      <Col span={8}>
                        <span>{formatPrice(opt.amount)}</span>
                      </Col>
                      <Col span={16}>
                        <span>Free Shipping Above</span>
                      </Col>
                      <Col span={8}>
                        <span>{formatPrice(opt.freeShippingAbove)}</span>
                      </Col>
                      <Col span={16}>
                        <span>Estimated Delivery</span>
                      </Col>
                      <Col span={8}>
                        <span>
                          {opt.minEddWeeks} - {opt.maxEddWeeks} weeks
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label="Min Week Value"
              name="minEddWeeks"
              rules={[
                {
                  required: true,
                  message: 'Please enter Min Week Value',
                },
                ({ getFieldValue }) => ({
                  validator: (rule, value) => {
                    const maxEddWeeks = getFieldValue('maxEddWeeks');
                    if (!value) return Promise.resolve();

                    if (value >= maxEddWeeks)
                      return Promise.reject(
                        Error('Min Week Value must be less than Max Week Value'),
                      );

                    return Promise.resolve();
                  },
                }),
              ]}
              dependencies={['maxEddWeeks']}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Max Week Value"
              name="maxEddWeeks"
              rules={[
                {
                  required: true,
                  message: 'Please enter Max Week Value',
                },
                ({ getFieldValue }) => ({
                  validator: (rule, value) => {
                    const minEddWeeks = getFieldValue('minEddWeeks');

                    if (!value) return Promise.resolve();

                    if (value <= minEddWeeks)
                      return Promise.reject(
                        Error('Max Week Value must be greater than Min Week Value'),
                      );

                    return Promise.resolve();
                  },
                }),
              ]}
              dependencies={['minEddWeeks']}
            >
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Button type="danger" onClick={() => onDelete(deliveryOption)} >
              Remove
            </Button>
          </Col>
        </Row>


      </Form>
    </div>
  );
};

export default DeliveryOptionsModal;
