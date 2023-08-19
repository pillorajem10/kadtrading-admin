import React, { useEffect, useState } from 'react';

// assets
import noProductImage from '@images/no-product-skeleton.svg';

// styling
import styles from './index.module.less';

const LogoAndName = ({ logo = '', displayName, onClick }) => {
  const [useFallbackSrc, setUseFallbackSrc] = useState();

  useEffect(() => {
    setUseFallbackSrc(false);
  }, [logo]);

  const logoSrc = useFallbackSrc ? noProductImage : logo;
  return (
    <div onClick={onClick} className={styles.container}>
      <img
        className={styles.logo}
        alt=""
        src={logoSrc}
        onError={() => {
          if (!useFallbackSrc) setUseFallbackSrc(true);
        }}
      />
      <span>{displayName}</span>
    </div>
  );
};

export default LogoAndName;
