import React, { useState } from 'react';

// react-color
import { PhotoshopPicker } from 'react-color';

// hooks
import useDisclosure from '@hooks/useDisclosure';

// components
import ColourPreview from '@components/ColourPreview';

// styling
import styles from './index.module.less';

const ColourPicker = ({ value, onChangeAccepted }) => {
  const { isOpen, toggleOpen } = useDisclosure();

  const [tempColour, setTempColour] = useState(value);

  const handleChangeComplete = (selectedColour) => {
    const { hex } = selectedColour;
    setTempColour(hex);
  };

  const handleCancelColorChange = () => {
    setTempColour(value);

    toggleOpen();
  };

  const handleAcceptColorChange = () => {
    onChangeAccepted(tempColour);
    toggleOpen();
  };

  return (
    <>
      <ColourPreview onClick={toggleOpen} colour={tempColour ?? '#777'} />
      {isOpen && (
        <div className={styles.colourPicker}>
          <PhotoshopPicker
            color={tempColour ?? '#777'}
            onChangeComplete={handleChangeComplete}
            onCancel={handleCancelColorChange}
            onAccept={handleAcceptColorChange}
          />
        </div>
      )}
    </>
  );
};

export default ColourPicker;
