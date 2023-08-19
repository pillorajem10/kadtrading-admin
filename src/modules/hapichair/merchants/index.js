import React from 'react';

// constants
import ROUTE_PATHS from '@constants/paths';

// components
import PageHeaderContainer from '@components/PageHeaderContainer';
import PageHeaderComponent from '@components/PageHeaderComponent';
import MerchantListSection from './sections/MerchantListSection';

const Merchants = () => {
  return (
    <PageHeaderContainer
      showHeader
      header={<PageHeaderComponent addNewPageUrl={ROUTE_PATHS.ADD_MERCHANT} />}
    >
      <MerchantListSection />
    </PageHeaderContainer>
  );
};

export default Merchants;
