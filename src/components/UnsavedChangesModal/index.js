import React from 'react';

// antd
import { Button, Modal, Space } from 'antd';

// styling
import './index.less';

const UnsavedChangesModal = ({ visible, onCancel, onOk }) => {
  return (
    <Modal
      destroyOnClose
      footer={false}
      closable={false}
      visible={visible}
      onClose={onCancel}
      title=""
    >
      <div className="unsaved-changes-container">
        <div>
          <p>Do you want to leave this page?</p>
          <p>Changes you made may not be saved.</p>
        </div>

        <Space>
          <Button type="danger" onClick={onCancel}>
            No
          </Button>
          <Button type="primary" onClick={onOk}>
            Yes
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default UnsavedChangesModal;
