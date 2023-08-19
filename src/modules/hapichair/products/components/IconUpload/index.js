import React from 'react';

// antd
import { Upload } from 'antd';

// components
import ColourPreview from '@components/ColourPreview';

// styling
import styles from './index.module.less';

const IconUpload = ({ onChange, disabled, icon }) => {
  if (disabled) return <img src={icon} className={styles.icon} alt="" />;

  return (
    <Upload
      name="file"
      showUploadList={false}
      multiple={false}
      action="/common-api/files?container=product&prefix=pimg&h=256"
      onChange={onChange}
      accept="image/*"
    >
      {icon ? <img src={icon} className={styles.icon} alt="" /> : <ColourPreview colour="#fff" />}
    </Upload>
  );
};

export default IconUpload;
