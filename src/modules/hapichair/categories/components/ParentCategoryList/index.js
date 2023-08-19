import React, { useState } from 'react';

// antd
import { Collapse, Input } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// components
import CategoryListActions from '../CategoryListActions';
import SubCategoryList from '../SubCategoryList';

// styling
import styles from './index.module.less';

const { Panel } = Collapse;

const ParentCategoryList = ({
  dataSource,
  onAddClick,
  onSubCategoryEditClick,
  onEditTitleSave,
}) => {
  const dispatch = useDispatch();
  const { expandedCategoryId} = useSelector((state) => state.hchair.categories);
  const [editingId, setEditingId] = useState();
  const [editedValue, setEditedValue] = useState();

  const handleEditClick = ({ _id, name }) => {
    setEditingId(_id);
    setEditedValue(name);
  };

  const handleInputChange = (event) => {
    const {
      target: { value },
    } = event;
    setEditedValue(value);
  };

  const handleEnterPress = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const payload = {
      id: editingId,
      name: editedValue,
    };
    onEditTitleSave(payload);

    setEditingId(null);
    setEditedValue(null);
  };

  return (
    <div className={styles.container}>
      <Collapse
        onChange={(ids) => {
          dispatch(hchair.categories.setExpandedCategory(ids));
        }}
        defaultActiveKey={expandedCategoryId}
        ghost>
        {dataSource.map((parentCategory) => {
          const { _id, name, categories } = parentCategory;

          return (
            <Panel
              showArrow={false}
              header={
                _id === editingId ? (
                  <Input
                    onPressEnter={handleEnterPress}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    className={styles.titleInput}
                    value={editedValue}
                    onChange={handleInputChange}
                  />
                ) : (
                  <h3>
                    {name} ({categories.length})
                  </h3>
                )
              }
              key={_id}
              extra={
                <CategoryListActions
                  category={parentCategory}
                  onAddClick={onAddClick}
                  onEditClick={handleEditClick}
                />
              }
            >
              <SubCategoryList
                onEditClick={onSubCategoryEditClick}
                dataSource={parentCategory.categories}
              />
            </Panel>

          );

        })}
      </Collapse>
    </div>
  );
};

export default ParentCategoryList;
