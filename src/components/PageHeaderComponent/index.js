import React from 'react';
import { useHistory } from 'react-router-dom';

// antd
import { Button, PageHeader, Space } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';

// config
import menuConfig from '@utils/menu-config';

// styling
import './index.less';

const removeLastSCharacter = (value) => {
  if (!value) return value;

  const isLastCharacterS = value[value.length - 1]?.toLowerCase() === 's';

  if (isLastCharacterS) return value.substr(0, value.length - 1);

  return value;
};

const PageHeaderComponent = ({
  addNewPageUrl,
  onAdd,
  onSave = () => {},
  onBack,
  disableSave = false,

  extras = [],
  hideActionButtons = false,
  addBtnText,
  pageHeaderTitleText,
}) => {
  const history = useHistory();

  const handleAddClick = () => {
    if (onAdd) {
      onAdd();
      return;
    }

    if (!addNewPageUrl) return;

    history.push(addNewPageUrl);
  };

  const handleCancelClick = () => {
    if (onBack) {
      onBack();
    }
    history.goBack();
  };

  const getSubRoutes = (routes = []) =>
    routes.map((r) => (r.subRoute && r.subRoute.length > 0 ? [r, ...getSubRoutes(r.subRoute)] : r));

  const allRoutes = menuConfig.flatMap((route) => {
    if (route.subRoute.length > 0) return [route, ...getSubRoutes(route.subRoute)];

    return route;
  });

  const { location } = history;

  const pageConfig = allRoutes.flat().find((route) => route.key === location.pathname);

  let parentPageTitle = '';
  let pageHeaderTitle = '';

  let title = '';
  let isDetailsPage = false;
  let isNewRecord = false;

  if (pageConfig) {
    title = pageConfig.title;
    pageHeaderTitle = pageConfig.title;

    if (location.search?.toLowerCase().indexOf('?id=') >= 0) {
      isDetailsPage = true;
    }

    if (location.pathname.toLowerCase().indexOf('new') >= 0) {
      isDetailsPage = true;
      isNewRecord = true;
    }
  }

  if (isDetailsPage) {
    // const isAdminToB = location.pathname.indexOf('hapichair') >= 0;
    const [adminRoutes] = menuConfig;
    const parentPage = adminRoutes.subRoute.find(
      (route) => location.pathname.indexOf(route.key) >= 0,
    );
    parentPageTitle = parentPage?.title;
  }

  const moduleName = removeLastSCharacter(parentPageTitle);

  if (!isDetailsPage) {
    const addButtonText = addBtnText ?? `Add ${title}`;
    return (
      <PageHeader title={pageHeaderTitle} className="page-header">
        <div className="flex-center-space-between">
          <div>
            <Space>{extras}</Space>
          </div>
          <div className="page-header-btn-group">
            {!hideActionButtons && (
              <Button type="primary" onClick={handleAddClick}>
                {addButtonText}
              </Button>
            )}
          </div>
        </div>
      </PageHeader>
    );
  }

  return (
    <PageHeader title={pageHeaderTitleText ?? pageHeaderTitle} className="page-header">
      <div className="flex-center-space-between">
        <div className="page-header-on-back" onClick={handleCancelClick}>
          <LeftCircleOutlined style={{ marginRight: 10 }} />
          All {parentPageTitle}
        </div>
        <Space className="page-header-btn-group">
          {extras}
          {(isNewRecord || !hideActionButtons) && (
            <>
              <Button type="primary" disabled={disableSave} onClick={onSave}>
                Save {moduleName}
              </Button>
            </>
          )}
        </Space>
      </div>
    </PageHeader>
  );
};

export default PageHeaderComponent;
