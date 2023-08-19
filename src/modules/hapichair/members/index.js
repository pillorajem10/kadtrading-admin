import React from 'react';

// constants
import ROUTE_PATHS from '@constants/paths';

// components
import PageHeaderContainer from '@components/PageHeaderContainer';
import PageHeaderComponent from '@components/PageHeaderComponent';
import MemberListSection from './sections/MemberListSection';

const Members = () => {
  return (
    <PageHeaderContainer
      showHeader
      header={<PageHeaderComponent addNewPageUrl={ROUTE_PATHS.ADD_MEMBER} />}
    >
      <MemberListSection />
    </PageHeaderContainer>
  );
};

export default Members;
