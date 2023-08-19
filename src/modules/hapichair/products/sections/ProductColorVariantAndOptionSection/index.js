import React from 'react';

// antd
import { Button, Divider, Form, Input, Modal, Table } from 'antd';

// hooks
import useDisclosure from '@hooks/useDisclosure';

// picture
import noProductImage from '@images/no-product-skeleton.svg';

// utils
import { formatPrice } from '@utils/methods';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';
import EmptyComponent from '@components/EmptyComponent';
import ColourPreview from '@components/ColourPreview';
import ProductVariantsModal from '../../components/ProductVariantsModal';
import ProductOptionsModal from '../../components/ProductOptionsModal';
import ProductOptionTable from '../../components/ProductOptionTable';
import IconUpload from '../../components/IconUpload';

// styling
import styles from './index.module.less';

const ProductColorVariantAndOptionSection = ({ form, triggerCompare }) => {
  const { isOpen: isColourVariantOpen, toggleOpen: toggleColourVariantModal } = useDisclosure();
  const { isOpen: isOptionsModalOpen, toggleOpen: toggleOpenOptionsModal } = useDisclosure();

  const handleSaveVariants = (values) => {
    const { variants } = values;
    form.setFieldsValue({
      variants,
    });

    toggleColourVariantModal();
    triggerCompare();
  };

  const handleSaveOptions = (values) => {
    const { optionGroups } = values;
    form.setFieldsValue({
      optionGroups,
    });
    toggleOpenOptionsModal();
    triggerCompare();
  };

  return (
    <DetailsSectionContainer title="Step 3 - Variant & Options">
      <div>
        <Form.Item name="variants" hidden>
          <Input />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {({ getFieldValue }) => {
            const variants = getFieldValue('variants');
            if (!variants || variants?.length <= 0) {
              return (
                <EmptyComponent
                  emptyText="Empty Colour Variant"
                  showButton
                  buttonText="Add Colour Variant"
                  click={toggleColourVariantModal}
                />
              );
            }
            return (
              <>
                <div className="flex-center-space-between mb-16">
                  <span>Colour Variants</span>
                  <Button type="primary" onClick={toggleColourVariantModal}>
                    Edit Colour Variants
                  </Button>
                </div>
                <Table
                  rowKey={(record) => {
                    const { tempId, id } = record;

                    return id ?? tempId;
                  }}
                  pagination={false}
                  columns={[
                    {
                      title: '',
                      width: 80,
                      dataIndex: 'images',
                      render: (record) => {
                        if (!record || record === '') return null;
                        return (
                          <>
                            {record.length > 0 ? (
                              <img className={styles.productListImg} src={record[0].url} alt="" />
                            ) : (
                              <img className={styles.productListImg} src={noProductImage} alt="" />
                            )}
                          </>
                        );
                      },
                    },
                    {
                      title: 'Label',
                      dataIndex: 'name',
                    },
                    {
                      title: 'Color Group',
                      dataIndex: 'colorGroup',
                    },
                    {
                      title: 'Colour/Material',
                      render: (record) => {
                        const { color, icon, label } = record;

                        if (label === 'ICON') return <IconUpload icon={icon} disabled />;

                        return <ColourPreview colour={color} />;
                      },
                    },
                    {
                      title: 'Price +/-',
                      dataIndex: 'price',
                      sorter: (a, b) => a.price - b.price,
                      render: (record) =>
                        !record || record === '' ? formatPrice(0) : formatPrice(record),
                    },
                  ]}
                  dataSource={variants}
                />
              </>
            );
          }}
        </Form.Item>
      </div>
      <Divider />
      <div>
        <Form.Item name="optionGroups" hidden>
          <Input />
        </Form.Item>
        <Form.Item shouldUpdate>
          {({ getFieldValue }) => {
            const optionGroups = getFieldValue('optionGroups') || [];

            if (optionGroups.length === 0)
              return (
                <div className={styles.productOptionContainer}>
                  <EmptyComponent
                    emptyText="Empty Product Option"
                    showButton
                    buttonText="Add Product Option"
                    click={toggleOpenOptionsModal}
                  />
                </div>
              );

            return (
              <>
                <div className="flex-center-space-between mb-16">
                  <span>Product Options</span>
                  <Button type="primary" onClick={toggleOpenOptionsModal}>
                    Edit Options
                  </Button>
                </div>

                {optionGroups && optionGroups.length > 0 && (
                  <ProductOptionTable optionGroups={optionGroups} triggerCompare={triggerCompare} />
                )}
              </>
            );
          }}
        </Form.Item>
      </div>

      <Modal
        destroyOnClose
        centered
        width={800}
        footer={false}
        title="Manage Colour Variants"
        visible={isColourVariantOpen}
        onCancel={toggleColourVariantModal}
      >
        <ProductVariantsModal
          variants={form.getFieldValue('variants')}
          onCancel={toggleColourVariantModal}
          onSave={handleSaveVariants}
        />
      </Modal>

      <Modal
        destroyOnClose
        centered
        width={800}
        footer={false}
        title="Manage Options"
        visible={isOptionsModalOpen}
        onCancel={toggleOpenOptionsModal}
      >
        <ProductOptionsModal
          optionGroups={form.getFieldValue('optionGroups')}
          onCancel={toggleOpenOptionsModal}
          onSave={handleSaveOptions}
        />
      </Modal>
    </DetailsSectionContainer>
  );
};

export default ProductColorVariantAndOptionSection;
