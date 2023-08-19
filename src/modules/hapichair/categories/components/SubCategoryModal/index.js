import React, { useEffect, useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// antd
import { Button, Col, Divider, Form, Input, message, Row, Switch, Upload } from 'antd';

// antd-img-crop
import ImgCrop from 'antd-img-crop';

// constants
import CATEGORY_STATUS from '@constants/category-status';

// components
import LoadComponent from '@components/LoadComponent';
import ParentCategoryDropdown from '@components/ParentCategoryDropdown';
import AddMoreButton from '../AddMoreButton';

// styling
import styles from './index.module.less';

const initLevel2Category = {
  active: 'INACTIVE',
  banner: '',
  categories: [],
  description: '',
  featured: false,
  image: '',
  level: 2,
  moodshot: '',
};

const AddSubCategoryModal = ({ onSave, onClose }) => {
  const [form] = Form.useForm();
  const [browseIndex, setBrowseIndex] = useState();

  const category = useSelector((state) => state.hchair.categories);

  const { selectedParentCategoryId, selectedCategory, levelOneCategories } = category;

  const parentId = selectedParentCategoryId ?? selectedCategory?.parentId;
  const parentCategory = levelOneCategories.find(lvl1 => lvl1._id === parentId);

  console.log('[AddSubCategoryModal] ', parentId, parentCategory);

  const handleFormFinish = (values) => {
    let allCategories;
    if (selectedParentCategoryId) {
      allCategories = [
        ...parentCategory?.categories,
        ...values.categories.map(({ active, ...cat }) => ({
          ...cat,
          status: active ? CATEGORY_STATUS.ACTIVE : CATEGORY_STATUS.INACTIVE,
        })),
      ];
    } else {
      const [formValue] = values.categories;
      allCategories = parentCategory?.categories.map(cat =>
        cat._id === selectedCategory._id
          ? {
              ...selectedCategory,
              ...formValue,
              status: formValue.active ? CATEGORY_STATUS.ACTIVE : CATEGORY_STATUS.INACTIVE,
            }
          : cat,
      );
    }

    onSave({ ...values, id: parentCategory._id, categories: allCategories });
  };

  const handleRemoveBanner = (categoryIndex) => {
    const categories = form.getFieldValue('categories');

    const newCategories = categories.map((data, index) =>
      index === categoryIndex ? { ...data, banner: '' } : data,
    );

    form.setFieldsValue({
      categories: newCategories,
    });
  };

  const handleDropdownChange = (pId) => {
    console.log('[handleDropdownChange] ', pId);
    form.setFieldsValue({
      parentId: pId,
    });
  };

  const defaultCategory = {
    ...initLevel2Category,
    parentId,
    active: true,
  };

  const initialValues = {
    categories: [{
      ...initLevel2Category,
      parentId,
    }],
  };

  const uploadProps = {
    name: 'banner',
    multiple: false,
    action: '/common-api/files?container=category&prefix=cat2',
    showUploadList: false,
    onChange: (info) => {
      const categories = form.getFieldValue('categories');

      if (info.file.status === 'done') {
        const { file } = info;
        const {
          response: { data: bannerImgUr },
        } = file;

        const newCategories = categories.map((data, index) =>
          index === browseIndex ? { ...data, banner: bannerImgUr } : data,
        );

        form.setFieldsValue({
          categories: newCategories,
        });

        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  if (!selectedParentCategoryId && !selectedCategory) return <LoadComponent />;

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

      <Divider />

      <Form form={form} initialValues={initialValues} onFinish={handleFormFinish}>
        <Form.List name="categories">
          {(fields, { add }) => (
            <>
              {fields.map((field) => (
                <div key={field.fieldKey}>
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        {...field}
                        label="Category Name"
                        fieldKey={[field.fieldKey, 'name']}
                        name={[field.name, 'name']}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Parent Category"
                        fieldKey={[field.fieldKey, 'parentId']}
                        name={[field.name, 'parentId']}
                      >
                        <ParentCategoryDropdown
                          selectedId={form.getFieldValue('parentId') ? form.getFieldValue('parentId') : parentId}
                          cList={category.levelOneCategories}
                          onChange={handleDropdownChange}
                          />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item shouldUpdate>
                    {({ getFieldValue }) => {
                      const categories = getFieldValue('categories');
                      const currentCategory = categories[field.name];
                      const { banner } = currentCategory;
                      return (
                        <div>
                          {!banner && <p className="mb-8">Category Banner - 2000 x 450 px</p>}
                          {banner && (
                            <>
                              <img src={banner} alt="" className={styles.bannerImg} />
                              <p className="mt-8 mb-8">Banner.png - 500KB</p>
                            </>
                          )}
                          {banner && (
                            <Button
                              className="mb-16 mr-8"
                              type="danger"
                              onClick={() => handleRemoveBanner(field.name)}
                            >
                              Remove
                            </Button>
                          )}
                          <ImgCrop
                            modalTitle="Crop Image"
                            modalWidth="80%"
                            aspect={2000 / 450}
                            rotate
                          >
                            <Upload key={field.fieldKey} {...uploadProps}>
                              <Button
                                className="mb-16"
                                type="primary"
                                onClick={() => setBrowseIndex(field.name)}
                              >
                                Browse
                              </Button>
                            </Upload>
                          </ImgCrop>
                        </div>
                      );
                    }}
                  </Form.Item>
                  <div>
                    <Form.Item
                      {...field}
                      valuePropName="checked"
                      label="Active"
                      fieldKey={[field.fieldKey, 'active']}
                      name={[field.name, 'active']}
                    >
                      <Switch />
                    </Form.Item>
                  </div>
                </div>
              ))}
              <Divider />

              {!selectedCategory && (
                <div className={styles.addMoreButtonContainer}>
                  <AddMoreButton onClick={() => add(defaultCategory)} />
                </div>
              )}
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
};

export default AddSubCategoryModal;
