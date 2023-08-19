import React from 'react';

// antd
import { Modal } from 'antd';

// hooks
import useDisclosure from '@hooks/useDisclosure';

// components
import PageHeaderContainer from '@components/PageHeaderContainer';
import PageHeaderComponent from '@components/PageHeaderComponent';
import CategoryListSection from './sections/CategoryListSection';
import AddParentCategory from './components/AddParentCategoryModal';

const Categories = () => {
  const { isOpen, toggleOpen } = useDisclosure();

  const handleAddClick = () => {
    toggleOpen();
  };

  return (
    <PageHeaderContainer
      showHeader
      header={<PageHeaderComponent onAdd={handleAddClick} addBtnText="Add Parent Category" />}
    >
      <CategoryListSection />
      <Modal
        destroyOnClose
        footer={false}
        title="Add Parent Category"
        visible={isOpen}
        onCancel={toggleOpen}
        onOk={toggleOpen}
      >
        <AddParentCategory key={1} onClose={toggleOpen} />
      </Modal>
    </PageHeaderContainer>
  );
};

export default Categories;
