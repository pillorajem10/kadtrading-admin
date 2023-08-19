import React from 'react';

// constants
import ROUTE_PATHS from '@constants/paths';

// components
import PageHeaderContainer from '@components/PageHeaderContainer';
import PageHeaderComponent from '@components/PageHeaderComponent';
import InhouseListSection from './sections/InhouseListSection';

const Inhouse = () => {
  return (
    <PageHeaderContainer
      showHeader
      header={<PageHeaderComponent addNewPageUrl={ROUTE_PATHS.ADD_INHOUSE} />}
    >
      <InhouseListSection />
    </PageHeaderContainer>
  );
};

export default Inhouse;
