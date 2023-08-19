import React from 'react';

import { /* formatPrice, */ tableStringSorter } from '@utils/methods';

const renderColumn = (select, record, fld) => {
  const { _id: calcId } = record;
  return (
    <div style={{ cursor: 'pointer' }}
      onClick={(e) => select(e, calcId)}>
      {record[fld]}
    </div>
  );
};


/*
	types: diamond, gemstone, product(setting)
	represent: globald, inhouse, setting
*/

export const calculationListColumn = (selectCalculation, /* updateCalculation */) => [
  {
    title: 'Name',
    key: 'name',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'name' }),
    render: (record) => renderColumn(selectCalculation, record, 'name'),
  },
  {
    title: 'Represent',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'represent' }),
    render: (record) => renderColumn(selectCalculation, record, 'represent'),
  },
  {
    title: 'Type',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'dtype' }),
    render: (record) => renderColumn(selectCalculation, record, 'dtype'),
  },
  {
    title: 'Markup (%)',
    key: 'markup',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'markup' }),
    render: (record) => renderColumn(selectCalculation, record, 'markup'),
  },
  {
    title: 'GST (%)',
    key: 'gst',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'gst' }),
    render: (record) => renderColumn(selectCalculation, record, 'gst'),
  },
  {
    title: 'Logistics',
    key: 'logistics',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'logistics' }),
    render: (record) => renderColumn(selectCalculation, record, 'logistics'),
  },
  {
    title: 'Shipping',
    key: 'shipping',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'shipping' }),
    render: (record) => renderColumn(selectCalculation, record, 'shipping'),
  },
];

export const sortList = {
  default: { filter: { sortBy: 'updateTime', sortOrder: 'desc' }},
  // companyNameAsc: { filter: { sortBy: 'companyName', sortOrder: 'asc' }},
  // companyNameDesc: { filter: { sortBy: 'companyName', sortOrder: 'desc' }},
};

export const mapDetailsToValues = (calculationDetails) => {
  const values = {
    ...calculationDetails,
  };
  return values;
};

export const mapSearchPayload = (values) => {
  const { searchName, keyword, sortBy, ...rest } = values;

  const sortOption = sortList[sortBy]?.filter;
  if (keyword) {
    return { [searchName]: keyword, ...sortOption, ...rest };
  }
  return { ...sortOption, ...rest };
};

export const tableKey = 'calculationListTable2B';
