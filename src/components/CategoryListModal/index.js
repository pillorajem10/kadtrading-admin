import React, { useCallback, useEffect, useState } from 'react';

// antd
import { Button, Form, Input, Select, Space, Table } from 'antd';

// hooks
import usePagination from '@hooks/usePagination';

// assets
import noProductImage from '@images/no-product-skeleton.svg';

// service
import { fetchCategoryListByParams, fetchMultipleCategory } from '@service/api/product';

const { Option } = Select;

const CategoryListModal = ({
  onClose,
  onSave,
  selectedRows = [],
  multiple = false,
  extraFilter = {},
}) => {
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState([]);
  const [searchName, setSearchName] = useState('name');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState(selectedRows);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [totalItem, setTotalItem] = useState(0);

  const { pageIndex, pageSize, onPageIndexChange } = usePagination();

  const getCategoryList = useCallback(
    async (overridePayload = { pageIndex: 1 }) => {
      const payload = {
        pageSize,
        ...overridePayload,
        ...extraFilter,
      };

      const res = await fetchCategoryListByParams(payload);

      const { success, data, page } = res;

      if (success) {
        setCategoryList(data);
        setTotalItem(page.totalItem);
      }
    },
    [pageSize, extraFilter],
  );

  const getMultipleCategory = useCallback(async () => {
    if (selectedRows.length === 0) return;
    const payload = {
      categoryIds: selectedRows,
    };
    const res = await fetchMultipleCategory(payload);
    const { success, data } = res;
    if (success) setSelectedCategories(data);
  }, [selectedRows]);

  const handleChangeSearchFilter = (value) => {
    setSearchName(value);
  };

  const handleSearch = () => {
    const keyword = form.getFieldValue('keyword');
    const payload = { [searchName]: keyword, pageIndex: 1 };
    setSearchKeyword(keyword);
    getCategoryList(payload);
    onPageIndexChange(1);
  };

  const handlePageIndexChange = (newPageIndex) => {
    const searchPayload = searchKeyword ? { [searchName]: searchKeyword } : {};
    const payload = { ...searchPayload, pageIndex: newPageIndex };
    getCategoryList(payload);
    onPageIndexChange(newPageIndex);
  };

  const handleSave = () => {
    if (multiple) onSave(selectedCategories);
    else onSave(selectedCategories[0]);
  };

  const handleSelectRows = (rows, rowsRecord) => {
    setSelectedRowKeys(rows);
    setSelectedCategories(rowsRecord);
  };

  useEffect(() => {
    getCategoryList();
  }, [getCategoryList]);

  useEffect(() => {
    getMultipleCategory();
  }, [getMultipleCategory]);

  return (
    <>
      <div className="flex-center-space-between mb-16">
        <Form layout="inline" form={form} name="CategoryListModalSearch" onFinish={handleSearch}>
          <Form.Item label="Search" name="keyword">
            <Input
              placeholder="Enter category name"
              addonAfter={
                <Select defaultValue={searchName} onChange={handleChangeSearchFilter}>
                  <Option value="name">Category Name</Option>
                </Select>
              }
            />
          </Form.Item>

          <Button htmlType="submit" type="primary">
            Search
          </Button>
        </Form>

        <Space>
          <Button type="primary" ghost onClick={onClose}>
            Close
          </Button>

          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </Space>
      </div>

      <Table
        rowKey="id"
        size="small"
        columns={[
          {
            title: 'Category Name',
            key: 'name',
            render: (record) => (
              <div className="flex-center-start">
                <img
                  src={record.image || noProductImage}
                  alt={record.name}
                  width={50}
                  height={50}
                />
                <span className="ml-8">{record.name}</span>
              </div>
            ),
          },
        ]}
        dataSource={categoryList}
        scroll={{
          y: 'calc(70vh - 125px)',
        }}
        rowSelection={{
          getCheckboxProps: (record) => ({
            disabled: record.disabled,
          }),
          type: multiple ? 'checkbox' : 'radio',
          onChange: handleSelectRows,
          selectedRowKeys,
        }}
        onRow={(record) => ({
          onClick: () => {
            const { id, disabled } = record;
            if (multiple) {
              if (disabled) return;

              setSelectedRowKeys((state) =>
                state.includes(id) ? state.filter((currentId) => currentId !== id) : [...state, id],
              );

              setSelectedCategories((state) =>
                state.find((category) => category.id === id)
                  ? state.filter((category) => category.id !== id)
                  : [...state, record],
              );
            } else handleSelectRows([id], [record]);
          },
        })}
        pagination={{
          current: pageIndex,
          pageSize,
          total: totalItem,
          onChange: handlePageIndexChange,
          showSizeChanger: false,
        }}
      />
    </>
  );
};

export default CategoryListModal;
