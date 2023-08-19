import React from 'react';
import { useHistory } from 'react-router-dom';

// antd
import { Affix, Button, PageHeader } from 'antd';

// Styling
import './index.less';

const ListHeader = () => {
  const history = useHistory();

  return (
    <Affix offsetTop={10}>
      <PageHeader className="merchant-list-header-container" title="Members">
        <div className="merchant-list-header-actions-container">
          <div className="label-detail-header-back-btn" />
          <Button type="primary" onClick={() => history.push('/hapichair/members?id=new')}>
            Add Member
          </Button>
        </div>
      </PageHeader>
    </Affix>
  );
};

export default ListHeader;
