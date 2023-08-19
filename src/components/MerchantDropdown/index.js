import React, { useEffect, useState } from 'react';

// antd
import { Select } from 'antd';

// service
import { fetchMerchantList } from '@service/api/merchant';
import { fetchMerchantList as toBfetchMerchantList } from '@service/api/merchant2b';

const { Option } = Select;

const MerchantDropdown = ({ platform = '2C', onChange, ...restProps }) => {
  const [merchantList, setMerchantList] = useState([]);

  const get2CData = async () => {
    if (merchantList.length > 0) return;

    const payload = { pageSize: 100 };

    const res = await fetchMerchantList(payload);
    if (res.success) {
      setMerchantList(res.data.docs);
    }
  };

  const get2BData = async () => {
    if (merchantList.length > 0) return;
    const payload = { pageSize: 100 };

    const res = await toBfetchMerchantList(payload);
    if (res.success) {
      setMerchantList(res.data.docs);
    }
  };

  useEffect(() => {
    if (platform === '2B') {
      get2BData();
    } else {
      get2CData();
    }
  }, []);

  const handleSelectMerchant = (value) => {
    // const formatValue = value.split('-')[0];
    onChange(value);
  };

  return (
    <Select
      {...restProps}
      showSearch
      allowClear
      placeholder="Select Merchant"
      onChange={handleSelectMerchant}
    >
      {merchantList.map((merchant) => (
        <Option value={merchant._id} key={`${merchant._id}-${merchant.displayName}`}>
          {merchant.displayName}
        </Option>
      ))}
    </Select>
  );
};

export default MerchantDropdown;
