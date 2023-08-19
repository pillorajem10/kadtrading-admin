import React from 'react';

// antd
import { Button, Divider, Form } from 'antd';

// utils
import { getRandomString } from '@utils/methods';

// components
import DnDProviderContainer from '@components/DnDProviderContainer';
import ModalActionButtons from '../ModalActionButtons';
import ProductVariantsInput from '../ProductVariantsInput';

// styling
import styles from './index.module.less';

const defaultVariant = {
  tempId: getRandomString(),
  name: null,
  images: [],
  group: null,
  colour: null,
  label: 'COLOR',
  price: null,
  hero: true,
  qtyAvailable: null,
};

const ProductVariantModal = ({ variants, onCancel, onSave }) => {
  const [form] = Form.useForm();

  const initialValues = {
    variants: variants.length === 0 ? [defaultVariant] : variants,
  };
  return (
    <div>
      <ModalActionButtons onCancel={onCancel} onSave={form.submit} />

      <Divider />
      <DnDProviderContainer>
        <Form
          preserve
          layout="vertical"
          form={form}
          onFinish={onSave}
          initialValues={initialValues}
        >
          <Form.Item shouldUpdate noStyle>
            {({ getFieldValue, setFieldsValue }) => {
              return (
                <Form.List name="variants">
                  {(fields, { add, remove }) => {
                    const handleDuplicateClick = (field) => {
                      const selectedField = getFieldValue('variants')[field.name];
                      const { id, images, ...rest } = selectedField;

                      add(
                        { ...rest, images: [], hero: false, tempId: getRandomString() },
                        field.name + 1,
                      );
                    };
                    return (
                      <>
                        <div className={styles.inputsContainer}>
                          {fields.map((field) => (
                            <ProductVariantsInput
                              field={field}
                              key={field.fieldKey}
                              onDuplicate={handleDuplicateClick}
                              onRemove={remove}
                              getFieldValue={getFieldValue}
                              setFieldsValue={setFieldsValue}
                            />
                          ))}
                        </div>
                        <div className="mt-16 align-right">
                          <Button
                            onClick={() =>
                              add({
                                ...defaultVariant,
                                hero: false,
                                tempId: getRandomString(),
                              })
                            }
                          >
                            Add Options
                          </Button>
                        </div>
                      </>
                    );
                  }}
                </Form.List>
              );
            }}
          </Form.Item>
        </Form>
      </DnDProviderContainer>
    </div>
  );
};

export default ProductVariantModal;
