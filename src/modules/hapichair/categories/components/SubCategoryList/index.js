import React from 'react';
import { useHistory } from 'react-router-dom';

// antd
import { List } from 'antd';

// constants
import ROUTE_PATHS from '@constants/paths';

// assets
import EmptyImage from '@images/empty.jpg';

// styling
import styles from './index.module.less';
import CategoryListActions from '../CategoryListActions';

const SubCategoryList = ({ extra = [], onMoveToTopClick, onEditClick, dataSource }) => {
  const history = useHistory();

  const handleListItemClick = (item) => {
    console.log('[handleListItemClick] ', item);
    history.push(`${ROUTE_PATHS.EDIT_SUB_CATEGORY}?id=${item._id}`);
  };

  return (
    <div className={styles.container}>
      <List
        rowKey="id"
        className={styles.list}
        size="small"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item
            className={item.level !== 3 ? styles.clickableListItem : null}
            onClick={() => {
              if (item.level === 3) return;
              handleListItemClick(item);
            }}
            extra={
              <CategoryListActions
                extra={extra}
                category={item}
                onEditClick={onEditClick}
                onMoveToTopClick={onMoveToTopClick}
              />
            }
          >
            <div className={styles.content}>
              {item.level === 3 && (
                <img
                  src={item.moodshot !== '' ? item.moodshot : EmptyImage}
                  className={styles.moodshotImage}
                  alt="moodshot"
                />
              )}
              <span>
                {item.name} ({item.categories?.length})
              </span>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SubCategoryList;
