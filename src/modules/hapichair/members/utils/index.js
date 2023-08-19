import React from 'react';

// antd
// import { Switch } from 'antd';

import { /* formatPrice, */ tableStringSorter } from '@utils/methods';

const renderColumn = (select, record, fld) => {
  const { _id: userId } = record;
  return (
    <div style={{ cursor: 'pointer' }}
      onClick={(e) => select(e, userId)}>
      {record[fld]}
    </div>
  );
};

export const memberListColumn = (selectMember, /* updateMember */) => [
  {
    title: 'First Name',
    key: 'fname',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'fname' }),
    render: (record) => renderColumn(selectMember, record, 'fname'),
  },
  {
    title: 'Last Name',
    key: 'lname',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'lname' }),
    render: (record) => renderColumn(selectMember, record, 'lname'),
  },
  {
    title: 'Email',
    key: 'email',
    sorter: (a, b) => tableStringSorter(a, b, { valuePropsName: 'email' }),
    render: (record) => renderColumn(selectMember, record, 'email'),
  },
    /*
  {
    title: 'Company',
    sorter: (a, b) => a.corp.companyName.length - b.corp.companyName.length,
    render: (record) => {
      return <>{(record.corp && record.corp) !== null ? record.corp.companyName : ''}</>;
    },
  },
  {
    title: 'Status',
    render: (record) => {
      return <>{(record.corp && record.corp) !== null ? 'Corporate' : ''}</>;
    },
  },
  {
    title: 'VIP',
    sorter: (a, b) => a.vip - b.vip,
    render: (record) => {
      const { vip, id } = record;
      const onChange = (checked, evt) => {
        evt.stopPropagation();
        const payload = { id, vip: checked };
        updateMember(payload);
      };

      return <Switch checked={vip} onChange={onChange} />;
    },
  },
  {
    title: 'Total Spents',
    dataIndex: 'totalSpent',
    key: 'totalSpent',
    sorter: (a, b) => a.totalSpent - b.totalSpent,
    render: (record) => formatPrice(record),
  },
  */
];

export const sortList = {
  default: { filter: { sortBy: 'updateTime', sortOrder: 'desc' }},
  // companyNameAsc: { filter: { sortBy: 'companyName', sortOrder: 'asc' }},
  // companyNameDesc: { filter: { sortBy: 'companyName', sortOrder: 'desc' }},
};

export const mapDetailsToValues = (memberDetails) => {
  const values = {
    ...memberDetails,
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

export const tableKey = 'memberListTable2B';
