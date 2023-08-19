import React, { useState } from 'react';

// antd
import { Button, Form, Input, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// redux
import { useSelector } from 'react-redux';

// hooks
import useDisclosure from '@hooks/useDisclosure';

// utils
import { getRandomString } from '@utils/methods';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';
import EmptyComponent from '@components/EmptyComponent';
import DeliveryOptions from '../../components/DeliveryOptions';
import DeliveryOptionsModal from '../../components/DeliveryOptionsModal';

const ProductDeliveryOptionsOverrideSection = ({ form, triggerCompare }) => {
  const { isOpen, toggleOpen } = useDisclosure();
  const [editDeliveryOption, setEditDeliveryOption] = useState();

  const { merchantDeliveryOptions } = useSelector((state) => state.hchair.products);

  const handleEdit = (deliveryOption) => {
    setEditDeliveryOption(deliveryOption);
    toggleOpen();
  };

  const handleDelete = ({ sourceId }) => {
    const { deliveryOverrides } = form.getFieldsValue();
    const filtered = deliveryOverrides.filter((dO) => dO.sourceId !== sourceId);
    form.setFieldsValue({ deliveryOverrides: filtered });
    triggerCompare();
    toggleOpen();
  };

  const handleSaveEditDeliveryOption = ({ id, sourceId, minEddWeeks, maxEddWeeks }) => {
    const { deliveryOverrides } = form.getFieldsValue();
    const isExisting = deliveryOverrides.map((opt) => opt.sourceId).includes(sourceId);
    let modDeliveryOverrides = [];

    if (!id && !isExisting) {
      modDeliveryOverrides = [...deliveryOverrides, ...[{ sourceId, minEddWeeks, maxEddWeeks }]];
    } else {
      modDeliveryOverrides = deliveryOverrides.map((deliveryOverride) => {
        const modDeliveryOverride = { ...deliveryOverride };
        if (modDeliveryOverride.sourceId === sourceId) {
          return {
            ...modDeliveryOverride,
            sourceId,
            minEddWeeks,
            maxEddWeeks,
          };
        }
        return modDeliveryOverride;
      });
    }

    form.setFieldsValue({
      deliveryOverrides: modDeliveryOverrides,
    });

    triggerCompare();
    toggleOpen();
  };

  const handleAddOverride = () => {
    setEditDeliveryOption(null);
    toggleOpen();
  };

  return (
    <DetailsSectionContainer title={null}>
      <Modal
        destroyOnClose
        width={800}
        footer={false}
        visible={isOpen}
        onCancel={toggleOpen}
        title={editDeliveryOption ? 'Edit Delivery Option' : 'Add Delivery Option'}
      >
        <DeliveryOptionsModal
          deliveryOption={editDeliveryOption}
          onCancel={toggleOpen}
          onSave={handleSaveEditDeliveryOption}
          onDelete={handleDelete}
        />
      </Modal>

      <Form.Item name="deliveryOverrides" hidden>
        <Input />
      </Form.Item>

      <div className="flex-center-space-between">
        <span>Delivery Options Override</span>

        <Button size="small" shape="circle" icon={<PlusOutlined />} onClick={handleAddOverride} />
      </div>

      <Form.Item shouldUpdate noStyle>
        {({ getFieldValue }) => {
          const deliveryOverrideList = getFieldValue('deliveryOverrides')?.map((dO) => {
            const { sourceId, minEddWeeks, maxEddWeeks } = dO;
            const modDeliveryOverride = merchantDeliveryOptions.find(
              (dOptions) => dOptions.id === dO.sourceId,
            );
            return {
              ...modDeliveryOverride,
              sourceId,
              minEddWeeks,
              maxEddWeeks,
            };
          });

          return deliveryOverrideList?.length > 0 ? (
            deliveryOverrideList.map((deliveryOption) => (
              <DeliveryOptions
                key={getRandomString()}
                deliveryOption={deliveryOption}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <EmptyComponent emptyText="No Delivery Option" />
          );
        }}
      </Form.Item>
    </DetailsSectionContainer>
  );
};

export default ProductDeliveryOptionsOverrideSection;
