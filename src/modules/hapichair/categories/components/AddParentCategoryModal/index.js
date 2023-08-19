import React from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// antd
import { Button, Form, Input, message } from 'antd';

// services
import { createCategory } from '@service/api/category2b';

// components
import AddMoreButton from '../AddMoreButton';

import { getRandomString } from '@utils/methods';

// styling
import styles from './index.module.less';

const AddParentCategory = ({ onClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { rootCategoryId } = useSelector(state => state.hchair.categories);

  const handleSave = async (values) => {
    const { categories } = values;

      console.log('[AAAA] ', categories, values);

    const createCategoryCalls = categories.map((category) => createCategory(category));

    await Promise.all(createCategoryCalls);

    await dispatch(hchair.categories.getLevelOneCategory());

    message.success('Created categories successfully!');
    onClose();
  };



  return (
    <>
      <div className={styles.actionBtnGroup}>
        <Button className="mr-8" type="primary" ghost onClick={onClose}>
          Cancel
        </Button>
        <Button type="primary" onClick={form.submit}>
          Save
        </Button>
      </div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ categories: [{ name: null, level: 1, parentId: rootCategoryId }] }}
        onFinish={handleSave}
      >
        <Form.List name="categories">
          {(fields, { add }) => (
            <>
              {fields.map((field) => (
                <div key={getRandomString()}>
                  <Form.Item
                    {...field}
                    key={getRandomString()}
                    label={field.name === 0 ? 'Parent Category Name' : null}
                    fieldKey={[field.fieldKey, 'name']}
                    name={[field.name, 'name']}
                    rules={[{ required: true, message: 'Please enter category name' }]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              ))}
              <div style={{ textAlign: 'right' }}>
                <AddMoreButton onClick={() => add()} />
              </div>
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
};

export default AddParentCategory;
