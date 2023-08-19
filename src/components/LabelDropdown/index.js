import React, { useEffect, useState } from 'react';

// antd
import { Select } from 'antd';

const { Option } = Select;

const LabelDropdown = ({ onChange, ...restProps }) => {
  const [labelList, setLabelList] = useState([]);

  useEffect(() => {
    setLabelList([]);
  }, []);

  const handleSelectLabel = (value) => {
    onChange(value);
  };

  return (
    <Select
      {...restProps}
      mode="tags"
      placeholder="Select Labels"
      showSearch
      allowClear
      onChange={handleSelectLabel}
    >
      {labelList.map((label) => (
        <Option value={label.id} key={label.id}>
          {label.name}
        </Option>
      ))}
    </Select>
  );
};

export default LabelDropdown;
