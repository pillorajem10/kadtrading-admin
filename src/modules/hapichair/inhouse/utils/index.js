import React from 'react';

// antd
import { Switch } from 'antd';

// utils
import { tableStringSorter } from '@utils/methods';

// components
import LogoAndName from '../components/LogoAndName';

export const inhouseListColumns = (handleUpdate, handleSelect) => [
  {
    title: 'Diamond Name',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'displayName' }),
    render: ({ _id, images, weight, shape, color, clarity }) => {
      const image = images && images.length > 0 ? images[0] : '';
      const dName = `${weight}ct., ${shape}, ${color}, ${clarity} Diamond`;
      return (
        <LogoAndName onClick={(e) => handleSelect(e, _id)} logo={image} displayName={dName} />
      );
    },
  },
  {
    title: 'Stock No',
    dataIndex: 'stockNo',
    key: 'stockNo',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'stockNo' }),
  },
  {
    title: 'Carat',
    dataIndex: 'weight',
    key: 'weight',
    sorter: (a, b) => a.weight - b.weight,
  },
  {
    title: 'Availability',
    render: ({ _id, availability }) => {
      let active = false;
      if (availability === 'G' || availability === 'STPS') {
        active = true;
      }
      const onChange = (checked, evt) => {
        evt.stopPropagation();
        const payload = {
          id: _id,
          availability: checked ? 'G' : 'NA',
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
  const { ...restValues } = data;

  return {
    ...restValues,
    // deliveryPolicy: normalizeBreakTagToString(deliveryPolicy),
    // returnPolicy: normalizeBreakTagToString(returnPolicy),
  };
};

export const tableKey = 'inhouseListTable';
