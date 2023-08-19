import React from 'react';

// antd
import { Button } from 'antd';

// styling
import styles from './index.module.less';

const AddMoreButton = ({ onClick }) => {
  return (
    <Button className={styles.button} type="text" onClick={onClick}>
      + Add More
    </Button>
  );
};

export default AddMoreButton;
