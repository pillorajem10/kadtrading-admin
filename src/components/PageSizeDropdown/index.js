import React from 'react';

// antd
import { Select, Space } from 'antd';

// utils
import { formatPagination } from '@utils/methods';

const { Option } = Select;

const PageSizeDropdown = ({
  pagination,
  onChange,
  dropdownOptions = [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
  ],
}) => {
  return (
    <Space className="flex-center-end">
      <p>{formatPagination(pagination)}</p>
      <Select style={{ width: 100 }} value={pagination.pageSize} onChange={onChange}>
        {dropdownOptions.map((option) => (
          <Option value={option.value} key={`dropdownoption-${option.value}`}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Space>
  );
};

export default PageSizeDropdown;
