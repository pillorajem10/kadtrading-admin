import React from 'react';

// antd
import { Alert, Row, Modal } from 'antd';

// antd icons
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

// styling
import './index.less';

const { confirm } = Modal;

const OptionsAlertContainer = ({ numberSelected, deleteMember }) => {
  const handleShowConfirmDeleteModal = () => {
    confirm({
      title: 'Do you want to delete these members?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMember();
      },
      onCancel() {
        return null;
      },
    });
  };

  return (
    <div className="merchant-list-options-alert-container">
      <Alert
        showIcon
        type="info"
        message={
          <Row className="options-alert">
            <p>
              <span>{numberSelected}</span> items selected
            </p>
            <div>
              <DeleteOutlined onClick={handleShowConfirmDeleteModal} />
            </div>
          </Row>
        }
      />
    </div>
  );
};

export default OptionsAlertContainer;
