import React, { useCallback, useEffect, useMemo, useState } from 'react';

// antd
import { Button, Form, Input, Select, Space, Table } from 'antd';

// hooks
import usePagination from '@hooks/usePagination';

// assets
import noProductImage from '@images/no-product-skeleton.svg';

// service
import { fetchProductList, fetchMultipleProduct } from '@service/api/product';

const { Option } = Select;

const ProductListModal = ({
  onClose,
  onSave,
  selectedRows = [],
  disabledIds = [],
  multiple = false,
  extraFilter,
}) => {
  const [form] = Form.useForm();
  const [productList, setProductList] = useState([]);
  const [searchName, setSearchName] = useState('name');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState(selectedRows);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [totalItem, setTotalItem] = useState(0);

  const { pageIndex, pageSize, onPageIndexChange } = usePagination();

  const getProductList = useCallback(
    async (overridePayload = { pageIndex: 1 }) => {
      const payload = {
        pageSize,
        ...overridePayload,
        ...(extraFilter ?? {}),
      };
      const res = await fetchProductList(payload);

      const { success, data, page } = res;

      if (success) {
        setProductList(data);
        setTotalItem(page.totalItem);
      }
    },
    [pageSize, extraFilter],
  );

  const getMultipleProduct = useCallback(async () => {
    if (selectedRows.length === 0) return;
    const payload = {
      productIds: selectedRows,
    };
    const res = await fetchMultipleProduct(payload);

    const { success, data } = res;
    if (success) setSelectedProducts(data);
  }, [selectedRows]);

  const handleChangeSearchFilter = (value) => {
    setSearchName(value);
  };

  const handleSearch = () => {
    const keyword = form.getFieldValue('keyword');
    const payload = { [searchName]: keyword, pageIndex: 1 };
    setSearchKeyword(keyword);
    getProductList(payload);
    onPageIndexChange(1);
  };

  const handlePageIndexChange = (newPageIndex) => {
    const searchPayload = searchKeyword ? { [searchName]: searchKeyword } : {};
    const payload = { ...searchPayload, pageIndex: newPageIndex };
    getProductList(payload);
    onPageIndexChange(newPageIndex);
  };

  const handleSave = () => {
    if (multiple) onSave(selectedProducts);
    else onSave(selectedProducts[0]);
  };

  const handleSelectRows = (rows, rowsRecord) => {
    setSelectedRowKeys(rows);
    setSelectedProducts(rowsRecord);
  };

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  useEffect(() => {
    getMultipleProduct();
  }, [getMultipleProduct]);

  const dataSource = useMemo(() => {
    return productList.map((product) => ({
      ...product,
      disabled: disabledIds?.includes(product.id),
    }));
  }, [productList, disabledIds]);

  return (
    <>
      <div className="flex-center-space-between mb-16">
        <Form layout="inline" form={form} name="ProductListModalSearch" onFinish={handleSearch}>
          <Form.Item label="Search" name="keyword">
            <Input
              placeholder="Enter product name"
              addonAfter={
                <Select defaultValue={searchName} onChange={handleChangeSearchFilter}>
                  <Option value="name">Product Name</Option>
                  <Option value="merchantName">Merchant Name</Option>
                  <Option value="categoryName">Category Name</Option>
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
            title: 'Product Name',
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
        dataSource={dataSource}
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

              setSelectedProducts((state) =>
                state.find((product) => product.id === id)
                  ? state.filter((product) => product.id !== id)
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

export default ProductListModal;
