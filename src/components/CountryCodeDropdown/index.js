import React, { useEffect, useState } from 'react';

// antd
import { Select } from 'antd';
import { countryCodes } from '@constants';

const { Option } = Select;

const CountryCodeDropdown = ({ selectedCountryCode = '', onChange }) => {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (selectedCountryCode !== '') {
      const code = countryCodes.find(m => m.Iso === selectedCountryCode);
      if (code) {
        setSelected(`${code.Iso} ${code.name}`);
      }
    }
  }, [selectedCountryCode]);

  const handleSelectCountryCode = (value) => {
    if (value && value.length > 0) {
      const formatValue = value.split('-')[0];
      onChange(formatValue);
    }
  };

  return (
    <Select
      showSearch
      value={selected !== '' ? selected : ''}
      placeholder="Select Country Code"
      onChange={handleSelectCountryCode}>
      {countryCodes.map((code) => (
        <Option
          value={`${code.Iso}-${code.name}`}
          key={`${code.Iso}-${code.name}`}
        >
          {`${code.Iso} ${code.name}`}
        </Option>
      ))}
    </Select>
  );
};

export default CountryCodeDropdown;
