import React, { Fragment, useRef } from 'react';

// antd
import { Button, Col, Divider, Form, Input, InputNumber, Row } from 'antd';

// utils
import { currencyFormatter, currencyParser, getRandomString } from '@utils/methods';

// components
import ModalActionButtons from '../ModalActionButtons';

// styling
import styles from './index.module.less';

const ProductOptionsModal = ({ optionGroups, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const modalRef = useRef();

  const defaultOption = {
    tempId: getRandomString(),
    seqId: 1,
    name: null,
    options: [
      {
        name: null,
        price: null,
      },
    ],
  };

  const initialValues = {
    optionGroups: optionGroups.length === 0 ? [defaultOption] : optionGroups,
  };

  const createOptions = (field, idx, options, { add, remove }) => {
    return (
      <Fragment key={`fragment-${field.key}`}>
        <Row key={field.key} gutter={8}>
          <Col span={12}>
            <Form.Item
              {...field}
              name={[field.name, 'name']}
              fieldKey={[field.fieldKey, 'name']}
              label="Option Title"
              rules={[{ required: true, message: 'Please enter a title' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...field}
              name={[field.name, 'price']}
              fieldKey={[field.fieldKey, 'price']}
              label="Price +/-"
              rules={[{ required: true, message: 'Please enter a price' }]}
            >
              <InputNumber precision={2} formatter={currencyFormatter} parser={currencyParser} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24} className={styles.buttonGroupColumn}>
            {idx > 0 && (
              <>
                <Button className={styles.buttonMargin} onClick={() => remove(field.name)}>
                  Remove
                </Button>
                {options.length - 1 === idx && (
                  <Button
                    className={styles.buttonMargin}
                    onClick={() => add({ name: null, price: null, tempId: getRandomString() })}
                  >
                    Add More Options
                  </Button>
                )}
              </>
            )}
            {idx === 0 && (
              <>
                {options.length > 1 && (
                  <Button className={styles.buttonMargin} onClick={() => remove(field.name)}>
                    Remove
                  </Button>
                )}
                {options.length === 1 && (
                  <Button
                    className={styles.buttonMargin}
                    onClick={() => add({ name: null, price: null, tempId: getRandomString() })}
                  >
                    Add More Options
                  </Button>
                )}
              </>
            )}
          </Col>
        </Row>
      </Fragment>
    );
  };

  const handleAddGroup = (add, groupLength) => {
    add({
      ...defaultOption,
      seqId: groupLength + 1,
    });

    setTimeout(() => {
      modalRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  const handleRemoveGroup = (remove, field) => {
    remove(field.name);
    const oG = form.getFieldValue('optionGroups');
    const modOptionGroups = oG.map((optionGroup, ctr) => {
      return { ...optionGroup, seqId: ctr + 1 };
    });
    form.setFieldsValue({ optionGroups: modOptionGroups });
  };

  return (
    <div className={styles.container}>
      <ModalActionButtons onCancel={onCancel} onSave={form.submit} />

      <Divider />
      <Form layout="vertical" form={form} onFinish={onSave} initialValues={initialValues}>
        <Form.List name="optionGroups">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, idx) => (
                  <div key={`option-field-${field.fieldKey}`}>
                    <Row>
                      <Col span={24} className={styles.buttonGroupColumn}>
                        {idx > 0 && (
                          <>
                            <Button
                              className={styles.buttonMargin}
                              onClick={() => handleRemoveGroup(remove, field)}
                            >
                              Remove Group
                            </Button>
                            {fields.length - 1 === idx && (
                              <Button
                                className={styles.buttonMargin}
                                onClick={() => handleAddGroup(add, fields.length)}
                              >
                                Add Group
                              </Button>
                            )}
                          </>
                        )}
                        {idx === 0 && (
                          <>
                            {fields.length > 1 && (
                              <Button
                                className={styles.buttonMargin}
                                onClick={() => handleRemoveGroup(remove, field)}
                              >
                                Remove Group
                              </Button>
                            )}
                            {fields.length === 1 && (
                              <Button
                                className={styles.buttonMargin}
                                onClick={() => handleAddGroup(add, fields.length)}
                              >
                                Add Group
                              </Button>
                            )}
                          </>
                        )}
                      </Col>
                    </Row>

                    <Row gutter={8}>
                      <Col span={24}>
                        <Form.Item
                          hidden
                          name={[field.name, 'seqId']}
                          fieldKey={[field.fieldKey, 'seqId']}
                          value={field.key + 1}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Option Group Title"
                          {...field}
                          fieldKey={[field.fieldKey, 'name']}
                          name={[field.name, 'name']}
                          rules={[{ required: true, message: 'Please enter group title' }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.List name={[field.name, 'options']}>
                      {(options, props) =>
                        options.map((option, optIdx) =>
                          createOptions(option, optIdx, options, props),
                        )
                      }
                    </Form.List>

                    <Divider />
                  </div>
                ))}
              </>
            );
          }}
        </Form.List>
      </Form>
      <div ref={modalRef} />
    </div>
  );
};

export default ProductOptionsModal;
