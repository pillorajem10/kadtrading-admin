import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

// antd
import { PageHeader, Row, Statistic, Tabs, Tag } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { hchair } from '@redux/combineActions';

// utils
import { statusList, tabs } from '../../utils';

// styling
import styles from './index.module.less';

const { TabPane } = Tabs;

const Header = () => {
  const dispatch = useDispatch();
  const { orderDetail, headerTabIndex } = useSelector((state) => state.hchair.orders);

  const history = useHistory();
  const { location } = history;

  const handleChangeHeaderTab = (value) => {
    dispatch(hchair.orders.updateHeaderTabIndex(value));
  };

  const renderTag = useMemo(() => {
    if (Object.keys(orderDetail).length > 0) {
      const tag = statusList.find((item) => item.status === orderDetail.status);
      return tag ? <Tag color={tag.color || 'red'}>{tag.name}</Tag> : null;
    }

    return null;
  }, [orderDetail]);

  const handleBack = () => {
    const [firstTab] = tabs;
    dispatch(hchair.orders.updateHeaderTabIndex(firstTab.key));

    history.goBack();
  };

  return (
    <PageHeader
      className={styles.container}
      onBack={handleBack}
      title={`Order No.: ${location.search.split('=')[1]}`}
      tags={renderTag}
      footer={
        <Tabs
          defaultActiveKey={tabs[0].key}
          onChange={handleChangeHeaderTab}
          activeKey={headerTabIndex}
        >
          {tabs.map((tab) => (
            <TabPane tab={tab.name} key={tab.key} />
          ))}
        </Tabs>
      }
    >
      <Row>
        <Statistic title="Status" value="Confirmed" />
        <Statistic
          title="Total Amount"
          prefix="$"
          value={orderDetail.amount || 0}
          precision={2}
          style={{ margin: '0 32px' }}
        />
      </Row>
    </PageHeader>
  );
};

export default Header;
