import { formatPrice } from '@utils/methods';

const useComputation = () => {
  const shippingFee = (orderTotal, deliveryOption) => {
    let optionAmount = 'Free';
    if (deliveryOption.freeShippingAbove > 0) {
      if (deliveryOption.freeShippingExtra !== 0 && deliveryOption.freeShippingExtra !== null) {
        if (orderTotal > deliveryOption.freeShippingAbove) {
          optionAmount = formatPrice(deliveryOption.freeShippingExtra);
        } else {
          optionAmount = deliveryOption.amount === 0 ? 'Free' : formatPrice(deliveryOption.amount);
        }
      } else if (orderTotal > deliveryOption.freeShippingAbove) {
        optionAmount = 'Free';
      } else {
        optionAmount = deliveryOption.amount === 0 ? 'Free' : formatPrice(deliveryOption.amount);
      }
    }
    return optionAmount;
  };

  return {
    shippingFee,
  };
};

export default useComputation;
