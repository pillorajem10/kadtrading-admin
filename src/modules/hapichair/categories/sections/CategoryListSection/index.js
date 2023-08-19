import React, { useCallback, useEffect } from 'react';

// antd
import { Divider, message, Modal } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { common, hchair } from '@redux/combineActions';

// hooks
import useDisclosure from '@hooks/useDisclosure';

// components
import ParentCategoryList from '../../components/ParentCategoryList';
import SubCategoryModal from '../../components/SubCategoryModal';

// styling
import styles from './index.module.less';

const CategoryListSection = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.hchair.categories);
  const { levelOneCategories, selectedCategory } = category;

  const { isOpen: isSubCategoryModalOpen, toggleOpen: toggleSubCategoryModal } = useDisclosure();

  const getLevelOneCategories = useCallback(async () => {
    await dispatch(common.ui.setLoading());
    await dispatch(hchair.categories.getRootCategory({ pageIndex: 1, pageSize: 1, level: 0 }));
    await dispatch(hchair.categories.getLevelOneCategory());
    await dispatch(common.ui.clearLoading());
  }, [dispatch]);

  const handleAddClick = (cat) => {
    const { _id } = cat;
    console.log('[HANDLEADDCLICK] ', cat);
    dispatch(hchair.categories.setSelectedParentCategoryId(_id));
    dispatch(hchair.categories.setSelectedCategory(cat));
    toggleSubCategoryModal();
  };

  const handleSubCategorySave = async (values) => {
    const res = await dispatch(hchair.categories.updateCategoryByParameters(values));
    const { success } = res;

    if (success) {
      message.success('Updated category successfully!');
      toggleSubCategoryModal();
    }
  };

  const handleSubCategoryEditClick = (subCategory) => {
    dispatch(hchair.categories.setSelectedCategory(subCategory));
    toggleSubCategoryModal();
  };

  const handleEditTitleSave = (payload) => {
    dispatch(hchair.categories.updateCategoryDetails(payload));
  };

  const handleCloseSubCategoryModal = () => {
    dispatch(hchair.categories.setSelectedParentCategoryId(null));
    dispatch(hchair.categories.setSelectedCategory(null));

    toggleSubCategoryModal();
  };

  useEffect(() => {
    getLevelOneCategories();

    return () => {
      dispatch(hchair.categories.reset());
    };
  }, [getLevelOneCategories, dispatch]);

  return (
    <div className={styles.container}>
      <Divider />
      <h3 className={styles.listHeader}>Parent Category</h3>
      <Divider />

      <ParentCategoryList
        dataSource={levelOneCategories}
        onAddClick={handleAddClick}
        onSubCategoryEditClick={handleSubCategoryEditClick}
        onEditTitleSave={handleEditTitleSave}
      />

      <Modal
        destroyOnClose
        width={800}
        footer={false}
        title={selectedCategory ? 'Edit Sub Category' : 'Add Sub Category'}
        visible={isSubCategoryModalOpen}
        onCancel={handleCloseSubCategoryModal}
        onOk={toggleSubCategoryModal}
      >
        <SubCategoryModal onSave={handleSubCategorySave} onClose={handleCloseSubCategoryModal} />
      </Modal>
    </div>
  );
};

export default CategoryListSection;
