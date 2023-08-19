import React, { useEffect, useState } from 'react';

// antd
import { TreeSelect } from 'antd';

// redux
import { useDispatch } from 'react-redux';
import { hchair } from '@redux/combineActions';

const { TreeNode } = TreeSelect;

const CategoryDropdown = ({ onChange, ...restProps }) => {


  // console.log('[CategoryDropdown] ', restProps);

  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const payload = {
      level: 3,
      status: 'ALL',
      includeSubs: true,
      pageIndex: 1,
      pageSize: 100,
    };

    const callBack = async (res) => {
      const { success, data } = res;
      if (success) {
        setCategoryList(data.docs);
      }
    };
    dispatch(hchair.categories.getCategoryList(payload)).then(callBack);

  }, [dispatch]);

  const handleSelectCategory = (ids) => {
    onChange(ids);
  };

  const handleFilter = (value, treeNode) => {
    return treeNode?.title?.toLowerCase().indexOf(value?.toLowerCase()) >= 0;
  };

  const modRestProps = {
    ...restProps,
    value: restProps.value
    ? restProps.value.map(cat => cat)
    : [],
  };

  return (
    <TreeSelect
      { ...modRestProps}
      placeholder="Select Category"
      onChange={handleSelectCategory}
      showSearch
      filterTreeNode={handleFilter}
      allowClear
      treeCheckable
    >
      {categoryList.map((level1) => (
        <TreeNode
          key={level1._id}
          value={level1._id}
          title={level1.name}
          checkable={true}
          selectable={true}
        >
        {/*



{level1.categories.map((level2) => (
  <TreeNode
    key={level2._id}
    value={level2._id}
    title={level2.name}
    checkable={false}
    selectable={false}
  >
    {level2.categories.map((level3) => (
      <TreeNode key={level3._id} value={level3._id} title={level3.name} />
    ))}
  </TreeNode>
))}


        */}

        </TreeNode>
      ))}
    </TreeSelect>
  );
};

export default CategoryDropdown;
