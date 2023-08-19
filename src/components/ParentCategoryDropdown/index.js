import React, { useEffect, useState } from 'react';

// antd
import { Select } from 'antd';

import './index.less';

const { Option } = Select;

const ParentCategoryDropdown = ({ selectedId = '', onChange, cList }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [selected, setSelected] = useState('');

  console.log('[ParentCategoryDropdown selectedId, cList] ', selectedId, cList);

  useEffect(() => {
    if (selectedId !== '') {
      const category = cList.find(m => m._id === selectedId);
      if (category) {
        setSelected(category.name);
      }
    }
    setCategoryList(cList);
  }, [selectedId, cList]);

  const handleSelectCategory = (value) => {
    if (value && value.length > 0) {
      const formatValue = value.split('-')[0];
      onChange(formatValue);
    }
  };

  return (
    <Select
      showSearch
      value={selected !== '' ? selected : ''}
      placeholder="Select Parent Category"
      onChange={handleSelectCategory}>
      {categoryList.map(({ _id, name }) => (
        <Option
          value={`${_id}-${name}`}
          key={`${_id}-${name}`}
        >
          {name}
        </Option>
      ))}
    </Select>
  );
};

export default ParentCategoryDropdown;
