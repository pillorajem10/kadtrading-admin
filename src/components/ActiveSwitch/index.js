import React from 'react';

// antd
import { Switch, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const ActiveSwitch = ({ itemName = '', record, onUpdate }) => {
  const { id, active } = record;

  const showConfirmModal = () => {
    confirm({
      title: active ? `Disable this ${itemName}?` : `Enable this ${itemName}?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const payload = {
          id,
          active: !active,
        };

        onUpdate(payload);
      },
      onCancel() {
        return null;
      },
    });
  };

  return (
    <Switch
      checked={active}
      onChange={(value, event) => {
        event.stopPropagation();
        showConfirmModal();
      }}
    />
  );
};

export default ActiveSwitch;
