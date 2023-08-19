import { useState } from 'react';

const usePagination = (
  { defaultPageIndex, defaultPageSize } = { defaultPageIndex: 1, defaultPageSize: 10 },
) => {
  const [pageIndex, setPageIndex] = useState(defaultPageIndex);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [totalItem, setTotalItem] = useState(0);

  const onPageIndexChange = (newPageIndex) => setPageIndex(newPageIndex);

  const onPageSizeChange = (newPageIndex) => setPageSize(newPageIndex);

  const onTotalItemChange = (newTotalItem) => setTotalItem(newTotalItem);

  return { pageIndex, pageSize, totalItem, onPageIndexChange, onPageSizeChange, onTotalItemChange };
};

export default usePagination;
