import React from 'react';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';
import MediaMultiInput from '../../components/MediaMultiInput';

const InhouseMediaSection = ({ triggerCompare }) => {
  return (
    <DetailsSectionContainer title="">
      <p className="mb-16">Medias</p>

      <MediaMultiInput name="images" triggerCompare={triggerCompare}>
        <p>Images</p>
      </MediaMultiInput>

      <MediaMultiInput name="videos" triggerCompare={triggerCompare}>
        <p>Videos</p>
      </MediaMultiInput>
    </DetailsSectionContainer>
  );
};

export default InhouseMediaSection;
