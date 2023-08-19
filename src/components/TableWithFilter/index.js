import React, { useCallback, useEffect, useState } from 'react';

// antd
import { Button, Form, Table, Tabs } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@redux/combineActions';

// components
import PageSizeDropdown from '@components/PageSizeDropdown';
import ListSelectionComponent from '@components/ListSelectionComponent';

const { TabPane } = Tabs;

const TableWithFilter = ({
  tableKey,
  children,
  filterInitialValues = {},
  getSearchPayload,
  paginationInitialValues = {
    pageIndex: 1,
    pageSize: 10,
  },
  filterFormProps = {},
  columns = [],
  dataSource = [],
  onRowClick = () => {},
  onSearch = async () => {},
  selectionProps = {
    show: true,
    onDelete: async () => {},
  },
  pageSizeProps = {},
  noSelection = false,
  tableTabs = [],
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const tableState = useSelector((state) => state.common.table);

  console.log('[TableWithFilter] ', tableState, tableState[tableKey]);

  const { pagination, filterValues } = tableState[tableKey] ?? {
    pagination: undefined,
    filterValues: undefined,
  };

  const doSearch = useCallback(
    async (payload, formValues) => {
      try {
        await dispatch(common.ui.setLoading());
        const res = await onSearch(payload);

        if (!res) return;
        const { success, data } = res;

        if (success) {
          dispatch(common.table.updatePagination({ key: tableKey, totalItem: data.totalDocs }));
          dispatch(common.table.cacheTableFilter({ key: tableKey, ...formValues }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        await dispatch(common.ui.clearLoading());
      }
    },
    [dispatch, onSearch, tableKey],
  );

  const handleFormFinish = useCallback(
    (values) => {
      const customFilter = getSearchPayload ? getSearchPayload(values) : values;
      const searchPayload = {
        ...customFilter,
      };

      doSearch(searchPayload, values);
    },
    [doSearch, getSearchPayload],
  );

  const handleSearchClick = (values) => {
    handleFormFinish({ ...values, pageIndex: 1, pageSize: pagination.pageSize });
    dispatch(common.table.updatePagination({ key: tableKey, pageIndex: 1 }));
  };

  const handlePageIndexChange = async (newPageIndex) => {
    await dispatch(common.table.updatePagination({ key: tableKey, pageIndex: newPageIndex }));
    await handleFormFinish({
      ...form.getFieldsValue(),
      pageIndex: newPageIndex,
      pageSize: pagination.pageSize,
    });
  };

  const handlePageSizeChange = async (newPageSize) => {
    await dispatch(
      common.table.updatePagination({ key: tableKey, pageIndex: 1, pageSize: newPageSize }),
    );
    await handleFormFinish({ ...form.getFieldsValue(), pageIndex: 1, pageSize: newPageSize });
  };

  const handleTabPaneChange = async () => {
    await dispatch(
      common.table.updatePagination({
        key: tableKey,
        pageIndex: 1,
        pageSize: tableState[tableKey]?.pagination.pageSize ?? 10,
      }),
    );
    await handleFormFinish({
      ...form.getFieldsValue(),
      pageIndex: 1,
      pageSize: tableState[tableKey]?.pagination.pageSize ?? 10,
    });
  };

  const handleSelect = (rowKeys) => {
    setSelectedRowKeys(rowKeys);
  };

  const handleDelete = async () => {
    if (selectionProps.onDelete) {
      await dispatch(common.ui.setLoading());
      await selectionProps.onDelete(selectedRowKeys);
      await dispatch(common.ui.clearLoading());

      setSelectedRowKeys([]);
      await handleFormFinish({
        ...form.getFieldsValue(),
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      });
    }
  };

  const initialize = useCallback(async () => {
    if (!tableKey) return;

    const table = tableState[tableKey];

    // if table existed in redux store,
    // do refresh and skil add table
    if (table) {
      return;
    }

    const key = tableKey;
    const payload = {
      key,
      filterValues: filterInitialValues,
      pagination: paginationInitialValues,
    };

    await dispatch(common.table.addTable(payload));
  }, [dispatch, tableKey, tableState, filterInitialValues, paginationInitialValues]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [dataSource]);

  useEffect(() => {
    if (!tableKey) return;

    /**
     * do search on mounting
     * 1. initial search uses initial values
     * 2. refresh listing using cached filter values
     */
    if (!filterValues) {
      const searchPayload = { ...filterInitialValues, ...paginationInitialValues };
      handleFormFinish(searchPayload);
    } else {
      handleFormFinish(filterValues);
    }

    /**
     * do not use any dependency here,
     * only want to invoke function when did mount
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!tableKey) {
    // eslint-disable-next-line no-console
    console.error('missing tableKey props');
    return null;
  }

  const defaultPagination = { current: 0, pageSize: 10, total: 0 };

  const tablePagination = tableState[tableKey]?.pagination
    ? {
        current: tableState[tableKey]?.pagination?.pageIndex,
        pageSize: tableState[tableKey]?.pagination?.pageSize,
        total: tableState[tableKey]?.pagination?.totalItem,
      }
    : defaultPagination;

  const rowSelectionProps = noSelection
    ? null
    : {
        onChange: handleSelect,
      };

  return (
    <div>
      {children && (
        <Form
          layout="inline"
          form={form}
          onFinish={handleSearchClick}
          initialValues={tableState[tableKey]?.filterValues ?? filterInitialValues}
          {...filterFormProps}
        >
          <div className="mb-16 flex-center-space-between full-width">
            <div className="flex-center-start">
              {children}

              <Button className="ml-8" type="primary" onClick={form.submit}>
                Search
              </Button>
            </div>

            <div>
              <PageSizeDropdown
                pagination={tableState[tableKey]?.pagination ?? defaultPagination}
                onChange={handlePageSizeChange}
                {...pageSizeProps}
              />
            </div>
          </div>
          {tableTabs.length > 0 && (
            <Form.Item name="status">
              <Tabs
                activeKey={tableState[tableKey]?.filterValues?.status ?? filterInitialValues.status}
                onChange={handleTabPaneChange}
              >
                {tableTabs.map((tabs) => (
                  <TabPane tab={tabs.tab} key={tabs.key} />
                ))}
              </Tabs>
            </Form.Item>
          )}
        </Form>
      )}

      {selectedRowKeys.length > 0 && selectionProps.show && (
        <ListSelectionComponent numberSelected={selectedRowKeys.length} onDelete={handleDelete} />
      )}

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelectionProps}
        pagination={{
          ...tablePagination,
          onChange: handlePageIndexChange,
          hideOnSinglePage: true,
          showSizeChanger: false,
          showQuickJumper: false,
        }}
        onRow={(record) => ({ onClick: () => onRowClick && onRowClick(record) })}
      />
    </div>
  );
};

export default TableWithFilter;
