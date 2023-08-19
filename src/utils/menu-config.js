import React from 'react';

// antd icons
import { ShopOutlined } from '@ant-design/icons';

// routes
import * as hapichair from '@modules/hapichair';

// constants
import ROUTE_PATHS from '../constants/paths';

const menuConfig = [
  {
    key: 'hapichair',
    title: 'Jumbo Gold',
    icon: <ShopOutlined />,
    subRoute: [
      {
        key: ROUTE_PATHS.ORDERS,
        title: 'Orders',
        component: hapichair.orders,
      },
      {
        key: ROUTE_PATHS.INHOUSE,
        title: 'Inhouse Diamonds',
        component: hapichair.inhouse,
        subRoute: [
          {
            key: ROUTE_PATHS.ADD_INHOUSE,
            title: 'Add New Inhouse Diamond',
            component: hapichair.addInhouse,
          },
          {
            key: ROUTE_PATHS.EDIT_INHOUSE,
            title: 'Edit Inhouse Diamond',
            component: hapichair.editInhouse,
          },
        ],
      },
      {
        key: ROUTE_PATHS.PRODUCTS,
        title: 'Products',
        component: hapichair.products,
        subRoute: [
          {
            key: ROUTE_PATHS.ADD_PRODUCT,
            title: 'Add New Product',
            component: hapichair.addProduct,
          },
          {
            key: ROUTE_PATHS.EDIT_PRODUCT,
            title: 'Edit Product',
            component: hapichair.editProduct,
          },
        ],
      },
      {
        key: ROUTE_PATHS.CALCULATIONS,
        title: 'Calculations',
        component: hapichair.calculations,
        subRoute: [
          {
            key: ROUTE_PATHS.ADD_CALCULATION,
            title: 'Add New Calculation',
            component: hapichair.addCalculation,
          },
          {
            key: ROUTE_PATHS.EDIT_CALCULATION,
            title: 'Edit Calculation',
            component: hapichair.editCalculation,
          },
        ],        
      },
      {
        key: ROUTE_PATHS.CATEGORIES,
        title: 'Categories',
        component: hapichair.categories,
        subRoute: [
          {
            key: ROUTE_PATHS.EDIT_SUB_CATEGORY,
            title: 'Category Detail - Sub Category',
            component: hapichair.editSubCategory,
          },
        ],
      },
      {
        key: ROUTE_PATHS.MEMBERS,
        title: 'Members',
        component: hapichair.members,
        subRoute: [
          {
            key: ROUTE_PATHS.ADD_MEMBER,
            title: 'Add New Member',
            component: hapichair.addMember,
          },
          {
            key: ROUTE_PATHS.EDIT_MEMBER,
            title: 'Edit Member',
            component: hapichair.editMember,
          },
        ],
      },
      {
        key: ROUTE_PATHS.MERCHANTS,
        title: 'Merchants',
        component: hapichair.merchants,
        subRoute: [
          {
            key: ROUTE_PATHS.ADD_MERCHANT,
            title: 'Add New Merchant',
            component: hapichair.addMerchant,
          },
          {
            key: ROUTE_PATHS.EDIT_MERCHANT,
            title: 'Edit Merchant',
            component: hapichair.editMerchant,
          },
        ],
      },
    ],
  },
];

export default menuConfig;
