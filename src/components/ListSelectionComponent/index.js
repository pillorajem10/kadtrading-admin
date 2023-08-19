import React from 'react';

// antd
import { Alert, Modal, Space } from 'antd';

// antd icons
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const OptionsAlertContainer = ({ numberSelected, onDelete }) => {
  const handleShowConfirmDeleteModal = () => {
    confirm({
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        onDelete();
      },
      onCancel() {
        return null;
      },
    });
  };

  return (
    <Alert
      showIcon
      type="info"
      className="mb-16"
      message={
        <div className="flex-center-space-between">
          <p>{numberSelected} items selected</p>

          <Space>
            <DeleteOutlined onClick={handleShowConfirmDeleteModal} />
          </Space>
        </div>
      }
    />
  );
};

export default OptionsAlertContainer;
