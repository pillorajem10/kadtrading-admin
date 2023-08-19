import React, { useEffect, useState } from 'react';

// antd
import { Select } from 'antd';

const { Option } = Select;

const MerchantListDropdown = ({ selectedMerchantId = '', onChange, mList }) => {
  const [merchantList, setMerchantList] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (selectedMerchantId !== '') {
      const merchant = mList.find(m => m.id === selectedMerchantId);
      if (merchant) {
        setSelected(merchant.displayName);
      }
    }
    setMerchantList(mList);
  }, [selectedMerchantId, mList]);

  const handleSelectMerchant = (value) => {
    if (value && value.length > 0) {
      const formatValue = value.split('-')[0];
      onChange(formatValue);
    }
  };

  return (
    <Select
      showSearch
      value={selected !== '' ? selected : ''}
      placeholder="Select Merchant"
      onChange={handleSelectMerchant}>
      {merchantList.map((merchant) => (
        <Option
          value={`${merchant.id}-${merchant.displayName}`}
          key={`${merchant.id}-${merchant.displayName}`}
        >
          {merchant.displayName}
        </Option>
      ))}
    </Select>
  );
};

export default MerchantListDropdown;
