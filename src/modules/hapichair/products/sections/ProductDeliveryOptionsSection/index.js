import React from 'react';

// redux
import { useSelector } from 'react-redux';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';
import EmptyComponent from '@components/EmptyComponent';
import DeliveryOptions from '../../components/DeliveryOptions';

const ProductDeliveryOptionsSection = () => {
  const { merchantDeliveryOptions } = useSelector((state) => state.hchair.products);

  return (
    <DetailsSectionContainer title={null}>
      <span>Delivery Options</span>

      {merchantDeliveryOptions?.length > 0 ? (
        merchantDeliveryOptions.map((deliveryOption) => (
          <DeliveryOptions
            key={`deliveryoption-${deliveryOption.sourceId ?? deliveryOption.id}`}
            deliveryOption={deliveryOption}
          />
        ))
      ) : (
        <EmptyComponent emptyText="No Delivery Option" />
      )}
    </DetailsSectionContainer>
  );
};

export default ProductDeliveryOptionsSection;
