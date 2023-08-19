import React, { useState } from 'react';

// antd
import { Button, Col, Divider, Form, Input, message, Row, Switch, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

// constants
import CATEGORY_STATUS from '@constants/category-status';

// utils
import { capitalize } from '@utils/methods';

// styling
import styles from './index.module.less';
import AddMoreButton from '../AddMoreButton';

const initLevel3Category = {
  active: 'INACTIVE',
  banner: '',
  categories: [],
  description: '',
  featured: false,
  image: '',
  level: 3,
  moodshot: '',
  parentId: '',
};

const LevelThreeCategoryModal = ({ initialValues, onCancel, onSave }) => {

  console.log('[LevelThreeCategoryModal initialValues] ', initialValues);

  const [form] = Form.useForm();
  const [browseIndex, setBrowseIndex] = useState();
  const [browseName, setBrowseName] = useState();

  const handleBrowseMoodshotClick = (index) => {
    setBrowseIndex(index);
    setBrowseName('moodshot');
  };

  const handleBrowseImageClick = (index) => {
    setBrowseIndex(index);
    setBrowseName('image');
  };

  const handleFormFinish = (values) => {
    const { categories } = values;

    console.log('[HANDLEFORMFINISH] ', categories);
    
    const payload = {
      categories: categories.map(({ active, ...restCategory }) => ({
        status: active ? CATEGORY_STATUS.ACTIVE : CATEGORY_STATUS.INACTIVE,
        ...restCategory,
      })),
    };

    onSave(payload);
  };

  const uploadProps = {
    name: 'banner',
    multiple: false,
    action: '/common-api/files?container=category&prefix=cat3',
    showUploadList: false,
    onChange: (info) => {
      const categories = form.getFieldValue('categories');

      if (info.file.status === 'done') {
        const { file } = info;
        const {
          response: { data: imgUrl },
        } = file;

        const newCategories = categories.map((data, index) =>
          index === browseIndex ? { ...data, [browseName]: imgUrl } : data,
        );

        form.setFieldsValue({
          categories: newCategories,
        });

        message.success(`${capitalize(browseName)} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${capitalize(browseName)} file upload failed.`);
      }
    },
  };

  const defaultCategory = {
    name: null,
    moodshot: null,
    image: null,
    status: 'ACTIVE',
    active: true,
    parentId: null,
  };

  const initialValue = initialValues
    ? {
        categories: [{ ...initialValues, active: initialValues.status === 'ACTIVE' }],
      }
    : { categories: [initLevel3Category] };

  return (
    <div>
      <div className={styles.actionBtnGroup}>
        <Button className="mr-8" type="primary" ghost onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary" onClick={form.submit}>
          Save
        </Button>
      </div>

      <Divider />

      <Form layout="vertical" form={form} initialValues={initialValue} onFinish={handleFormFinish}>
        <Form.List name="categories">
          {(fields, { add }) => (
            <>
              {fields.map((field) => (
                <div key={field.fieldKey}>
                  <Row gutter={8}>
                    <Col span={18}>
                      <Form.Item
                        {...field}
                        label="Category Name"
                        fieldKey={[field.fieldKey, 'name']}
                        name={[field.name, 'name']}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        {...field}
                        valuePropName="checked"
                        label="Active"
                        fieldKey={[field.fieldKey, 'active']}
                        name={[field.name, 'active']}
                      >
                        <Switch />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item shouldUpdate>
                    {({ getFieldValue }) => {
                      const categories = getFieldValue('categories');
                      const category = categories[field.name];
                      const { image, moodshot } = category;
                      return (
                        <Row gutter={8}>
                          <Col span={12}>
                            <p>Category Moodshot - 600 x 800 px</p>
                            {moodshot && (
                              <div>
                                <img src={moodshot} alt="" className={styles.moodshotImage} />
                                <p className="mt-8 mb-8">Moodshot.png - 500KB</p>
                              </div>
                            )}
                            <ImgCrop
                              modalTitle="Crop Image"
                              modalWidth="80%"
                              aspect={600 / 800}
                              rotate
                            >
                              <Upload {...uploadProps}>
                                <Button
                                  className="mt-8"
                                  type="primary"
                                  onClick={() => handleBrowseMoodshotClick(field.name)}
                                >
                                  Browse
                                </Button>
                              </Upload>
                            </ImgCrop>
                          </Col>
                          <Col span={12}>
                            <p>Category Image - 800 x 800 px</p>
                            {image && (
                              <div>
                                <img src={image} alt="" className={styles.image} />
                                <p className="mt-8 mb-8">Cover.png - 500KB</p>
                              </div>
                            )}
                            <ImgCrop
                              modalTitle="Crop Image"
                              modalWidth="80%"
                              aspect={800 / 800}
                              rotate
                            >
                              <Upload {...uploadProps}>
                                <Button
                                  className="mt-8"
                                  type="primary"
                                  onClick={() => handleBrowseImageClick(field.name)}
                                >
                                  Browse
                                </Button>
                              </Upload>
                            </ImgCrop>
                          </Col>
                        </Row>
                      );
                    }}
                  </Form.Item>

                  <Divider />
                </div>
              ))}
              {!initialValues && (
                <div className={styles.addMoreBtnContainer}>
                  <AddMoreButton onClick={() => add(defaultCategory)} />
                </div>
              )}
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default LevelThreeCategoryModal;
