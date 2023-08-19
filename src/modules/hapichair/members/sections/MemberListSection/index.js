import React from 'react';
import { useHistory } from 'react-router-dom';

// antd
import { message } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { common, hchair } from '@redux/combineActions';

// components
import TableWithFilter from '@components/TableWithFilter';

// constants
import ROUTE_PATHS from '@constants/paths';

// hooks
import useCache from '@hooks/useCache';

// utils
import { memberListColumn, mapSearchPayload } from '../../utils';
import MemberFilterContainer from '../../components/MemberFilterContainer';

const tableKey = 'memberListTable';

const MemberListSection = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const members = useSelector((state) => state.hchair.members);
  const { dataList } = members;

  const { searchPayloadCache, setCache } = useCache({
    tableKey,
    moduleIndexPath: ROUTE_PATHS.MEMBERS,
    storeName: 'hchair.members',
  });

  const handleSearch = (payload) => {
    setCache(payload);
    return dispatch(hchair.members.getMemberList(payload));
  };

  const handleUpdate = async (payload) => {
    await dispatch(common.ui.setLoading());
    const success = await dispatch(hchair.members.simpleUpdateMember(payload));
    await dispatch(common.ui.clearLoading());

    if (success) {
      message.success('Member updated successfully!');
      const searchPayload = mapSearchPayload(searchPayloadCache);
      await dispatch(hchair.members.getMemberList(searchPayload));
    }
  };

  const handleDelete = async (payload) => {
    await dispatch(common.ui.setLoading());
    const res = await dispatch(hchair.members.removeMember(payload));
    await dispatch(common.ui.clearLoading());

    const { success } = res;

    if (success) {
      message.success('Member removed successfully!');
      const searchPayload = mapSearchPayload(searchPayloadCache);
      dispatch(hchair.members.getMemberList(searchPayload));
    }
  };

  const handleBatchDelete = async (memberIds) => {
    await dispatch(common.ui.setLoading());
    await dispatch(hchair.members.batchRemoveMember(memberIds));
    await dispatch(common.ui.clearLoading());
  };

  const handleSelectMember = (evt, id) => {
    evt.stopPropagation();
    history.push(`${ROUTE_PATHS.EDIT_MEMBER}?id=${id}`);
  };

  return (
    <>
      <TableWithFilter
        tableKey={tableKey}
        onSearch={handleSearch}
        filterInitialValues={{ keyword: undefined, searchName: 'fname', sortBy: 'default' }}
        getSearchPayload={mapSearchPayload}
        paginationInitialValues={{ pageIndex: 1, pageSize: 50 }}
        columns={memberListColumn(handleSelectMember, handleUpdate, handleDelete)}
        dataSource={dataList}
        selectionProps={{
          show: true,
          onDelete: handleBatchDelete,
        }}
        pageSizeProps={{
          dropdownOptions: [
            { value: '50', label: '50' },
            { value: '100', label: '100' },
            { value: '250', label: '250' },
            { value: '300', label: '300' },
          ],
        }}
      >
        <MemberFilterContainer />
      </TableWithFilter>
    </>
  );
};

export default MemberListSection;
