import React from 'react';

// antd
import { Empty, Button } from 'antd';

// antd icons
import { PlusOutlined } from '@ant-design/icons';

const EmptyComponent = ({
  emptyText = 'No Data',
  showButton,
  buttonText = 'Create Now',
  click = null,
  disabled = false,
}) => {
  return (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyText}>
      {showButton && (
        <Button type="primary" ghost icon={<PlusOutlined />} onClick={click} disabled={disabled}>
          {buttonText}
        </Button>
      )}
    </Empty>
  );
};

export default EmptyComponent;
