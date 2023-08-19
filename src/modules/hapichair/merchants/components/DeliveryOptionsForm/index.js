import React from 'react';

// antd
import { Button, Divider, Form } from 'antd';

// utils
import { getRandomString } from '@utils/methods';

// components
import ModalActionButtons from '@components/ModalActionButtons';
import DeliveryOptionInput from '../DeliveryOptionInput';

// styling
import styles from './index.module.less';

const defaultDeliveryOption = {
  name: null,
  amount: null,
  // minEddWeeks: null,
  // maxEddWeeks: null,
};

const DeliveryOptionsForm = ({ deliveryOptions, onCancel, onSave }) => {
  const [form] = Form.useForm();

  const handleSave = (values) => {
    const { deliveryOptions: deliveryOpts } = values;
    onSave(deliveryOpts.map((opt) => (opt.id ? opt : { ...opt, tempKey: getRandomString() })));
  };

  const formInitialValues = {
    deliveryOptions: deliveryOptions.length === 0 ? [defaultDeliveryOption] : deliveryOptions,
  };

  return (
    <div className={styles.container}>
      <ModalActionButtons onCancel={onCancel} onSave={form.submit} />

      <Divider />

      <Form
        layout="vertical"
        form={form}
        initialValues={formInitialValues}
        validateMessages={{
          // eslint-disable-next-line no-template-curly-in-string
          required: '${label} is required',
        }}
        onFinish={handleSave}
      >
        <Form.List name="deliveryOptions">
          {(fields, { add, remove }) => {
            const handleRemove = (index) => {
              remove(index);
              if (fields.length === 1) {
                add(defaultDeliveryOption);
              }
            };

            return (
              <>
                {fields.map((field) => {
                  return <DeliveryOptionInput
                    key={field.key}
                    field={field}
                    onRemove={() => handleRemove(field.name)}
                  />
                })}

                <div className="align-right">
                  <Button onClick={() => add(defaultDeliveryOption)}>Add Option</Button>
                </div>
              </>
            );
          }}
        </Form.List>
      </Form>
    </div>
  );
};

export default DeliveryOptionsForm;
