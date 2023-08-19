import React from 'react';

// antd
import { Button } from 'antd';

const ModalActionButtons = ({ onCancel, onSave, disabled }) => {
  return (
    <div className="align-right mb-16">
      <Button className="mr-8" type="primary" ghost onClick={onCancel}>
        Cancel
      </Button>
      <Button type="primary" onClick={onSave} disabled={disabled}>
        Save
      </Button>
    </div>
  );
};

export default ModalActionButtons;
