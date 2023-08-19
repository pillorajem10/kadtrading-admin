import React from 'react';

// utils
import { getColourCode } from '@utils/methods';

// styling
import styles from './index.module.less';

const ColourPreview = ({ colour, onClick, small, style = {} }) => {
  const size = small ? { width: '24px', height: '24px' } : {};

  const bgColour = getColourCode(colour);

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: bgColour ?? 'transparent',

        cursor: onClick ? 'pointer' : 'default',
        ...size,
        ...style,
      }}
      onClick={onClick}
    />
  );
};

export default ColourPreview;
