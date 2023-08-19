import React from 'react';

// antd
import { Switch } from 'antd';

// utils
import { normalizeBreakTagToString, tableStringSorter } from '@utils/methods';

// components
import LogoAndName from '../components/LogoAndName';

export const merchantListColumns = (handleUpdate, handleSelect) => [
  {
    title: 'Merchant',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'displayName' }),
    render: ({ _id, logo, displayName }) => {
      return (
        <LogoAndName onClick={(e) => handleSelect(e, _id)} logo={logo} displayName={displayName} />
      );
    },
  },
  {
    title: 'Total Products',
    dataIndex: 'totalProducts',
    key: 'totalProducts',
    sorter: (a, b) => a.totalProducts - b.totalProducts,
  },
  {
    title: 'Verified Merchant',
    render: ({ verified, _id }) => {
      const onChange = (checked, evt) => {
        evt.stopPropagation();
        const payload = { id: _id, verified: checked };
        handleUpdate(payload);
      };
      return <Switch checked={verified} onChange={onChange} />;
    },
  },
  {
    title: 'Active',
    render: ({ _id, active }) => {
      const onChange = (checked, evt) => {
        evt.stopPropagation();
        const payload = {
          id: _id,
          active: checked,
        };
        handleUpdate(payload);
      };
      return <Switch checked={active} onChange={onChange} />;
    },
  },
];

export const sortMatrix = {
  default: { filter: { sortBy: 'updateTime', sortOrder: 'desc' } },
  merchantAsc: { filter: { sortBy: 'displayName', sortOrder: 'asc' } },
  merchantDesc: { filter: { sortBy: 'displayName', sortOrder: 'desc' } },
};

export const getSearchPayload = (values) => {
  const { displayName, sortBy, ...restValues } = values;

  if (displayName) {
    return { displayName, ...sortMatrix[sortBy]?.filter, ...restValues };
  }

  return { ...sortMatrix[sortBy]?.filter, ...restValues };
};

export const mapDataToValues = (data) => {
  const { deliveryPolicy, returnPolicy, ...restValues } = data;

  return {
    ...restValues,
    deliveryPolicy: normalizeBreakTagToString(deliveryPolicy),
    returnPolicy: normalizeBreakTagToString(returnPolicy),
  };
};

export const tableKey = 'merchantListTable';
