import { lazy } from 'react';

export const orders = lazy(() => import('./orders'));
export const merchants = lazy(() => import('./merchants'));
export const addMerchant = lazy(() => import('./merchants/actions/add-new-merchant'));
export const editMerchant = lazy(() => import('./merchants/actions/edit-merchant'));
export const categories = lazy(() => import('./categories'));
export const editSubCategory = lazy(() => import('./categories/actions/edit-sub-category'));
export const members = lazy(() => import('./members'));
export const addMember = lazy(() => import('./members/actions/add-new-member'));
export const editMember = lazy(() => import('./members/actions/edit-member'));
export const products = lazy(() => import('./products'));
export const addProduct = lazy(() => import('./products/actions/add-new-product'));
export const editProduct = lazy(() => import('./products/actions/edit-product'));

export const calculations = lazy(() => import('./calculations'));
export const addCalculation = lazy(() => import('./calculations/actions/add-new-calculation'));
export const editCalculation = lazy(() => import('./calculations/actions/edit-calculation'));

export const inhouse = lazy(() => import('./inhouse'));
export const addInhouse = lazy(() => import('./inhouse/actions/add-new-inhouse'));
export const editInhouse = lazy(() => import('./inhouse/actions/edit-inhouse'));
