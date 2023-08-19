import React, { useEffect, useState } from 'react';

// antd
import { Table } from 'antd';

// utils
import { productOptionColumn } from '../../utils';

const ProductOptionTable = ({ optionGroups }) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const data = [];
    if (optionGroups) {
      if (optionGroups.length > 0) {
        optionGroups.map((group) => {
          group.options.map((option) => {
            data.push({
              groupTitle: group.name,
              key: option.id ?? option.tempId,
              optionTitle: option.name,
              optionPrice: option.price,
            });
            return option;
          });
          return group;
        });
        setDataSource(data);
      }
    }
  }, [optionGroups]);

  return (
    <Table pagination={false} columns={productOptionColumn} dataSource={dataSource} size="small" />
  );
};

export default ProductOptionTable;
