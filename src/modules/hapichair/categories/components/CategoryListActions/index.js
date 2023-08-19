import React from 'react';

// redux
import { useDispatch } from 'react-redux';
import { hchair } from '@redux/combineActions';

// antd
import { Tooltip, Button, Modal } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';

// utils
import { capitalize } from '@utils/methods';

// constants
import CATEGORY_STATUS from '@constants/category-status';

const { confirm } = Modal;

const CategoryListActions = ({
  extra = [],
  category,
  onMoveToTopClick,
  onAddClick,
  onEditClick,
}) => {
  const dispatch = useDispatch();

  const { _id, status } = category;

  const handleAddClick = (event) => {
    event.stopPropagation();
    onAddClick(category);
  };
  const handleEditClick = (event) => {
    event.stopPropagation();
    onEditClick(category);
  };

  const handleMoveToTopClick = (event) => {
    event.stopPropagation();
    onMoveToTopClick(category);
  };

  const confirmChangeVisibility = () => {
    let newStatus = status;

    if (status === CATEGORY_STATUS.ACTIVE) newStatus = CATEGORY_STATUS.INACTIVE;
    if (status === CATEGORY_STATUS.INACTIVE) newStatus = CATEGORY_STATUS.ACTIVE;

    const payload = {
      _id,
      status: newStatus,
    };
    dispatch(hchair.categories.updateCategoryDetails(payload));
  };

  const handleVisibilityClick = (event) => {
    event.stopPropagation();
    let newStatus = status;

    if (status === CATEGORY_STATUS.ACTIVE) newStatus = CATEGORY_STATUS.INACTIVE;
    if (status === CATEGORY_STATUS.INACTIVE) newStatus = CATEGORY_STATUS.ACTIVE;

    confirm({
      title: `Confirm change status to ${capitalize(newStatus.toLowerCase())}?`,
      onOk: confirmChangeVisibility,
    });
  };

  const confirmDelete = () => {
    dispatch(hchair.categories.removeCategory(_id));
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();

    confirm({
      title: 'Confirm delete this category?',

      onOk: confirmDelete,
    });
  };

  return [
    ...extra.map((extraComponent, index) => <div key={`extra-${index}`}>{extraComponent}</div>),
    onAddClick && (
      <Tooltip key={`add-category-${_id}`} title="Add Sub Category">
        <Button className="mr-8" icon={<PlusOutlined />} shape="circle" onClick={handleAddClick} />
      </Tooltip>
    ),
    onMoveToTopClick && (
      <Tooltip title="Move To Top">
        <Button
          onClick={handleMoveToTopClick}
          className="mr-8"
          shape="circle"
          icon={<VerticalAlignTopOutlined />}
        />
      </Tooltip>
    ),
    <Tooltip key={`edit-category-${_id}`} title="Edit Category">
      <Button className="mr-8" icon={<EditOutlined />} shape="circle" onClick={handleEditClick} />
    </Tooltip>,
    <Tooltip
      key={`hide-category-${_id}`}
      title={status === CATEGORY_STATUS.ACTIVE ? 'Disable Category' : 'Enable Category'}
    >
      <Button
        className="mr-8"
        icon={status === CATEGORY_STATUS.ACTIVE ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        shape="circle"
        onClick={handleVisibilityClick}
      />
    </Tooltip>,
    <Tooltip key={`delete-category-${_id}`} title="Delete Category">
      <Button icon={<DeleteOutlined />} shape="circle" onClick={handleDeleteClick} />
    </Tooltip>,
  ];
};

export default CategoryListActions;
