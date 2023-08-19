import React, { useState, Suspense, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// antd
import { Layout, Menu, Dropdown, Spin } from 'antd';

// antd icons
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

// components
import LoadComponent from '@components/LoadComponent';
import FormChangesPrompt from '@components/FormChangesPrompt';

// constants
import { appVersion } from '@constants';
import PATHS from '@constants/paths';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@redux/combineActions';

// utils
import menuConfig from '@utils/menu-config';

// picture
import kadLogo from '@images/shi.png';

// styling
import styles from './index.module.less';


const { SubMenu } = Menu;
const { Footer, Header, Sider, Content } = Layout;

const menuKeys = menuConfig.map((menu) => menu.key);

const BasicLayout = ({ children }) => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);

  const history = useHistory();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([location.pathname.split('/')[1]]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location]);

  const handleToggleCollapse = () => setCollapsed((prevState) => !prevState);

  const handleLogout = () => {
    dispatch(common.user.userLogout());
  };

  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (menuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const headerDropdown = (
    <Menu>
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={300}
        className={styles.basicLayoutSider}
      >
        {/* HapiChair Logo */}
        <div className={styles.logo}>
          <img className={collapsed ? styles.imgIco : styles.imgLogo} src={collapsed ? kadLogo : kadLogo} alt="Rptgen" />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[
            location.pathname === '/' ? PATHS.ORDERS : location.pathname,
          ]}
          defaultOpenKeys={[location.pathname.split('/')[1]]}
          style={{ height: 'calc(100vh - 64px)', overflow: 'scroll' }} // 64px is Logo + its margin
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
        >
          {menuConfig.map((menu) =>
            menu.subRoute.length > 0 ? (
              <SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
                {menu.subRoute.map((subMenu) => (
                  <Menu.Item key={subMenu.key} onClick={() => history.push(subMenu.key)}>
                    {subMenu.title}
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={menu.key} icon={menu.icon} onClick={() => history.push(menu.key)}>
                {menu.title}
              </Menu.Item>
            ),
          )}
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 300, transition: 'all 0.2s' }}>
        {/* Header */}
        <Header
          className={styles.basicLayoutHeader}
          style={{ width: `calc(100% - ${collapsed ? 80 : 300}px)`, transition: 'all 0.2s' }}
        >
          {/* Fold / Unfold Icon */}
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: styles.trigger,
            onClick: handleToggleCollapse,
          })}

          {/* Avatar */}
          <Dropdown overlay={headerDropdown} placement="bottomCenter">
            <div className={styles.basicLayoutAvatar}>Admin</div>
          </Dropdown>
        </Header>
        {/* Content */}
        <Content className={styles.basicLayoutContent}>
          <Spin spinning={ui?.loading}>
            <Suspense fallback={<LoadComponent />}>{children}</Suspense>
          </Spin>
        </Content>
        <Footer className={styles.basicLayoutFooter}>
          <div className={styles.footerContainer}>
            <div>© 2021 Jumbo Gold Admin. All Rights Reserved.</div>
            <div>Version: {appVersion}</div>
          </div>
        </Footer>
      </Layout>
      <FormChangesPrompt />
    </Layout>
  );
};

export default BasicLayout;
