import React, { useEffect, useState } from 'react';

// antd
import { Select } from 'antd';

import { formatPrice } from '@utils/methods';

import './index.less';

const { Option } = Select;

const DeliveryOptionDropdown = ({ selectedId = '', onChange, dList, doList }) => {
  const [deliveryOptionList, setDeliveryOptionList] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (selectedId !== '') {
      const deliveryOption = dList.find(m => m.id === selectedId);
      if (deliveryOption) {
        setSelected(deliveryOption.name);
      }
    }
    setDeliveryOptionList(dList);
  }, [selectedId, dList]);

  const handleSelectDeliveryOption = (value) => {
    if (value && value.length > 0) {
      const formatValue = value.split('-')[0];
      onChange(formatValue);
    }
  };

  return (
    <Select
      showSearch
      value={selected !== '' ? selected : ''}
      placeholder="Select Delivery Option"
      onChange={handleSelectDeliveryOption}>
      {deliveryOptionList.map((deliveryOption) => (
        <Option
          disabled={selectedId === deliveryOption.id}
          value={`${deliveryOption.id}-${deliveryOption.name}`}
          key={`${deliveryOption.id}-${deliveryOption.name}`}
        >
          <div className="do-container">
            <p className="do-name">{deliveryOption.name}</p>
            <div className="do-wrapper">
              <div className="do-item"><div>Amount Limit:</div><div>{formatPrice(deliveryOption.freeShippingAbove)}</div></div>
              <div className="do-item"><div>Above Limit:</div><div>{formatPrice(deliveryOption.freeShippingExtra)}</div></div>
              <div className="do-item"><div>Below Limit:</div><div>{formatPrice(deliveryOption.amount)}</div></div>
              <div className="do-item"><div>Lead Time:</div><div>{`${deliveryOption.minEddWeeks} - ${deliveryOption.maxEddWeeks} weeks`}</div></div>
            </div>
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default DeliveryOptionDropdown;
