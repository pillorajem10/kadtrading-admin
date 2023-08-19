import React from 'react';

// components
import DeliveryOption from '../DeliveryOption';

// styles
import styles from './index.module.less';

const DeliveryOptionsList = ({ deliveryOptions }) => {
  return (
    <div className={styles.container}>
      {deliveryOptions.map((deliveryOption) => (
        <DeliveryOption
          key={deliveryOption.tempKey ?? deliveryOption.id}
          deliveryOption={deliveryOption}
        />
      ))}
    </div>
  );
};

export default DeliveryOptionsList;
