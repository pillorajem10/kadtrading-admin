import React from 'react';

// antd
import { Button, Divider, Form, Input, Modal } from 'antd';

// hooks
import useDisclosure from '@hooks/useDisclosure';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';
import DeliveryOptionsForm from '../../components/DeliveryOptionsForm';
import DeliveryOptionsList from '../../components/DeliveryOptionsList';

const MerchantDeliveryAndPoliciesSection = ({ form, triggerCompare }) => {
  const { isOpen, toggleOpen } = useDisclosure();

  const handleSaveDeliveryOptions = (deliveryOptions) => {
    form.setFieldsValue({
      deliveryOptions,
    });
    toggleOpen();
    triggerCompare();
  };

  return (
    <DetailsSectionContainer title="Step 4 - Returns & Delivery">
      <div className="flex-center-space-between">
        <p>Delivery Options</p>
        <Form.Item name="deliveryOptions" hidden>
          <Input />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {({ getFieldValue }) => {
            const deliveryOptions = getFieldValue('deliveryOptions');

            if (deliveryOptions.length === 0) return null;

            return (
              <Button type="primary" ghost onClick={toggleOpen}>
                Edit
              </Button>
            );
          }}
        </Form.Item>
      </div>

      <Form.Item shouldUpdate noStyle>
        {({ getFieldValue }) => {
          const deliveryOptions = getFieldValue('deliveryOptions');

          if (deliveryOptions.length === 0)
            return (
              <Button className="mt-16" type="primary" onClick={toggleOpen}>
                Add Options
              </Button>
            );

          return <DeliveryOptionsList deliveryOptions={deliveryOptions} />;
        }}
      </Form.Item>

      <Divider />

      <Form.Item label="Return Policy" name="returnPolicy">
        <Input.TextArea rows={6} />
      </Form.Item>

      <Form.Item label="Delivery Policy" name="deliveryPolicy">
        <Input.TextArea rows={6} />
      </Form.Item>



      <Modal
        footer={false}
        width={800}
        destroyOnClose
        title="Manage Delivery Options"
        visible={isOpen}
        onCancel={toggleOpen}
      >
        <DeliveryOptionsForm
          deliveryOptions={form.getFieldValue('deliveryOptions')}
          onCancel={toggleOpen}
          onSave={handleSaveDeliveryOptions}
        />
      </Modal>
    </DetailsSectionContainer>
  );
};

export default MerchantDeliveryAndPoliciesSection;
