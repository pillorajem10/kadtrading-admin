import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// antd
import { Button, Divider, message, Modal } from 'antd';

// hooks
import useDisclosure from '@hooks/useDisclosure';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// components
import PageHeaderContainer from '@components/PageHeaderContainer';
import PageHeaderComponent from '@components/PageHeaderComponent';
import SubCategoryList from '../../components/SubCategoryList';
import LevelThreeCategoryModal from '../../components/LevelThreeCategoryModal';

// styling
import styles from './index.module.less';

const EditSubCategory = () => {
  const { isOpen, toggleOpen } = useDisclosure();
  const location = useLocation();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState();
  const [levelOneCategory, setLevelOneCategory] = useState();
  const [levelTwoCategory, setLevelTwoCategory] = useState();

  const category = useSelector((state) => state.hchair.categories);
  const { levelThreeCategories } = category;

  const handleEditClick = (value) => {
    setSelectedCategory(value);
    toggleOpen();
  };

  const handleCloseModal = () => {
    toggleOpen();
    setSelectedCategory(null);
  };

  const handleSave = async (values) => {
    const id = location.search.split('=')[1];

    const { categories: updatedCategories } = values;
    const payload = {
      categories: [
        ...levelThreeCategories,
        ...updatedCategories.map((d) => ({ ...d, parentId: id })),
      ],
      id,
    };

    console.log('[handleSave LEVEL3 values, levelThreeCategories, payload] ', values, levelThreeCategories, payload);

    const res = await dispatch(hchair.categories.updateSubCategory(payload));
    const { success } = res;

    if (success) {
      message.success('Category updated successfully!');
    }

    handleCloseModal();
  };

  const handleMoveToTopClick = (targetCategory) => {
    const { _id } = targetCategory;
    const payload = { id: _id };
    dispatch(hchair.categories.updateCategoryDetails(payload));
  };

  const getCategoryData = useCallback(async () => {
    const id = location.search.split('=')[1];

    dispatch(hchair.categories.getLevelThreeCategory(id));

    const levelTwoCategoryRes = await dispatch(hchair.categories.getCategoryById(id));
    const { success, data } = levelTwoCategoryRes;

    if (success) {
      setLevelTwoCategory(data);
      const levelOneCategoryRes = await dispatch(hchair.categories.getCategoryById(data.parentId));

      if (levelOneCategoryRes.success) setLevelOneCategory(levelOneCategoryRes.data);
    }
  }, [dispatch, location]);

  useEffect(() => {
    getCategoryData();

    return () => {
      dispatch(hchair.categories.setLevelThreeCategory([]));
    };
  }, [dispatch, getCategoryData]);

  const pageHeaderTitle =
    (levelOneCategory && levelTwoCategory)
      ? `Categories > ${levelOneCategory?.name} > ${levelTwoCategory?.name}`
      : 'Categories';

  console.log('[EDIT SUB-CATEGORY selectedCategory, levelTwoCategory, levelThreeCategories] ', selectedCategory, levelTwoCategory, levelThreeCategories);

  return (
    <PageHeaderContainer
      showHeader
      header={
        <PageHeaderComponent
          hideActionButtons
          pageHeaderTitleText={pageHeaderTitle}
          extras={[
            <Button key="add-sub-category-btn" type="primary" onClick={toggleOpen}>
              Add Sub Category
            </Button>,
          ]}
        />
      }
    >
      <div>
        <Divider />
        <h3 className={styles.listHeader}>Sub Category</h3>
        <Divider />
        <SubCategoryList
          onMoveToTopClick={handleMoveToTopClick}
          onEditClick={handleEditClick}
          dataSource={levelThreeCategories}
        />
      </div>

      <Modal
        destroyOnClose
        width={800}
        footer={false}
        title={selectedCategory ? 'Edit Sub Category' : 'Add Sub Category'}
        visible={isOpen}
        onCancel={handleCloseModal}
      >
        <LevelThreeCategoryModal
          initialValues={selectedCategory}
          onCancel={handleCloseModal}
          onSave={handleSave}
        />
      </Modal>
    </PageHeaderContainer>
  );
};

export default EditSubCategory;
