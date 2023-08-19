import React from 'react';

// antd
import { Spin } from 'antd';

// styling
import './index.less';

const LoadComponent = () => {
  return (
    <Spin tip="Loading...">
      <div className="load-component-container" />
    </Spin>
  );
};

export default LoadComponent;
