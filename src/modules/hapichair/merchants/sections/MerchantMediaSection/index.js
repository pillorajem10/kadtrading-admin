import React from 'react';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';
import MediaInput from '../../components/MediaInput';

const MerchantMediaSection = ({ triggerCompare }) => {
  return (
    <DetailsSectionContainer>
      <p className="mb-16">Medias</p>

      <MediaInput name="logo" triggerCompare={triggerCompare}>
        <p>Merchant Logo</p>
        <p>(400 x 400px)</p>
      </MediaInput>

      <MediaInput name="headerBanner" triggerCompare={triggerCompare}>
        <p>Shop Page Header Banner</p>
        <p>(2000 x 450px)</p>
      </MediaInput>


    </DetailsSectionContainer>
  );
};

export default MerchantMediaSection;
