import React from 'react';

// antd
import { Button, Col, Row } from 'antd';

// utils
import { formatPrice } from '@utils/methods';

// styling
import styles from './index.module.less';

const DeliveryOptions = ({ deliveryOption, onEdit }) => {
  return (
    <div className={styles.container}>
      <Row>
        <Col span={16}>
          <span>{deliveryOption.name}</span>
        </Col>
        {onEdit && (
          <Col span={8}>
            <div className="align-right mb-8">
              <Button type="primary" ghost size="small" onClick={() => onEdit(deliveryOption)}>
                Edit
              </Button>
            </div>
          </Col>
        )}
      </Row>
      <Row className={styles.deliveryDetailsContainer}>
        <Col span={16}>
          <span>Delivery Amount</span>
        </Col>
        <Col span={8}>
          <span>{formatPrice(deliveryOption.amount)}</span>
        </Col>
        <Col span={16}>
          <span>Free Shipping Above</span>
        </Col>
        <Col span={8}>
          <span>{formatPrice(deliveryOption.freeShippingAbove)}</span>
        </Col>
        <Col span={16}>
          <span>Estimated Delivery</span>
        </Col>
        <Col span={8}>
          <span>
            {deliveryOption.minEddWeeks} - {deliveryOption.maxEddWeeks} weeks
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default DeliveryOptions;
