import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { common, hchair } from '@redux/combineActions';

/**
 *
 * @param {*} payload
 * payload = { tableKey: string, moduleIndexPath: string, storeName: string}
 *
 * tableKey = key used for TableWithFilter
 *
 * moduleIndexPath = module path, use for clearing state on leaving the module
 *
 * storeName = redux store name to invoke reset action if any
 *
 * eg: 'hchair.products', or 'products' if it's not a multiplatform store
 */
const useCache = ({ tableKey, moduleIndexPath, storeName }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const tableState = useSelector((state) => state.common.table);

  if (!tableKey) {
    // eslint-disable-next-line no-console
    console.error('MISSING tableKey Props');
  }

  const [searchPayloadCache, setSearchPayloadCache] = useState(
    tableState[tableKey]?.filterValues ?? {},
  );

  const setCache = (payload) => setSearchPayloadCache(payload);

  const clearTableCache = useCallback(() => {
    const { location } = history;

    /*
     * leaving module = navigate from Product module to Members module
     * navigate from listing page to details page does not mean leaving module
     */
    const isLeavingModule = location.pathname.indexOf(moduleIndexPath) < 0;

    if (isLeavingModule) {
      if (tableKey) dispatch(common.table.removeTable(tableKey));

      const multiplatform = storeName.split('.').length === 2;

      if (!multiplatform) {
        dispatch(storeName?.reset());
      } else {
        const [platform, module] = storeName.split('.');
        if (platform === 'hchair' && hchair[module]?.reset) {
          dispatch(hchair[module]?.reset());
        }
      }
    }
  }, [dispatch, history, tableKey, moduleIndexPath, storeName]);

  useEffect(() => {
    return clearTableCache;
  }, [clearTableCache]);

  return {
    setCache,
    searchPayloadCache,
  };
};

export default useCache;
