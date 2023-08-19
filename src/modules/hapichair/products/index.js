import React from 'react';

// constants
import ROUTE_PATHS from '@constants/paths';

// components
import PageHeaderContainer from '@components/PageHeaderContainer';
import PageHeaderComponent from '@components/PageHeaderComponent';
import ImportExportButtons from './components/ImportExportButtons';
import ProductListSection from './sections/ProductListSection';

const Products = () => {
  return (
    <PageHeaderContainer
      showHeader
      header={<PageHeaderComponent
      extras={[<ImportExportButtons key="1" path={ROUTE_PATHS.PRODUCT} />]}
      addNewPageUrl={ROUTE_PATHS.ADD_PRODUCT} />}>
      <ProductListSection />
    </PageHeaderContainer>
  );
};

export default Products;
