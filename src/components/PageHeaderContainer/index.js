import React from 'react';
import { useHistory } from 'react-router-dom';

// antd
import { Affix } from 'antd';

// styling
import './index.less';

const PageHeaderContainer = ({ header, children, showHeader = false, custom = false }) => {
  const history = useHistory();
  const { location } = history;

  return (
    <div className="page-header-container">
      <Affix>{(location.search !== '' || showHeader) && header}</Affix>
      <div
        className={
          custom ? 'page-header-container-custom-content' : 'page-header-container-content'
        }
      >
        {children}
      </div>
    </div>
  );
};

export default PageHeaderContainer;
