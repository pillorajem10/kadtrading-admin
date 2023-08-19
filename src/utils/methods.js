import React from 'react';
import moment from 'moment';
import jwtDecode from "jwt-decode";
import NumberFormat from 'react-number-format';
import { transform, isEqual, isObject } from 'lodash';

export const useDebounce = (func, wait) => {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(this, args);
    }, wait);
  };
};

/**
 * decode jwt
 * @param {*} params
 */
export const decode = (params) => {
  return jwtDecode(params);
};

/**
 * convert object to query string
 * @param {*} params
 */
export const convertQueryString = (params) => {
  return Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

/**
 * format price, for example:
 * from 20, to $20.00
 * @param {*} price
 */
export const formatPrice = (price) => (
  <NumberFormat
    decimalScale={2}
    fixedDecimalScale
    value={price}
    displayType="text"
    thousandSeparator
    prefix="$"
  />
);

export const checkIsNumber = (value) => !Number.isNaN(Number(value));

/**
 * generate random string
 */
export const getRandomString = () => {
  const r = Math.random().toString(36).substring(7);
  return r;
};

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getExtension = (filename) => {
  const parts = filename.split('.');
  return parts[parts.length - 1];
};

export const formatPagination = (pagination) => {
  if (!pagination) return '';

  const { pageIndex, pageSize, totalItem } = pagination;
  if (
    pageIndex === null ||
    pageIndex === undefined ||
    pageSize === null ||
    pageSize === undefined ||
    totalItem === null ||
    totalItem === undefined
  )
    return '';

  const currentPageItemStartPosition = (pageIndex - 1) * pageSize + 1;
  const currentPageItemEndPosition =
    pageIndex * pageSize > totalItem ? totalItem : pageIndex * pageSize;

  return `${currentPageItemStartPosition} - ${currentPageItemEndPosition} of ${totalItem}`;
};

export const areEqualObjects = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const getObjectDifference = (target, source) => {
  return transform(target, (result, value, key) => {
    if (!isEqual(value, source[key])) {
      result[key] =
        isObject(value) && isObject(source[key]) ? getObjectDifference(value, source[key]) : value;
    }
  });
};

export const difference = (target, source) => {
  const propertyDifferences = getObjectDifference(target, source);

  return Object.keys(propertyDifferences).reduce(
    (result, key) => ({ ...result, [key]: target[key] }),
    {},
  );
};

export const currencyFormatter = (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const currencyParser = (value) => value.replace(/\$\s?|(,*)/g, '');

export const mapMomentValueToNumber = (values) => {
  return Object.keys(values).reduce((result, key) => {
    const value = values[key];
    if (moment.isMoment(value)) {
      return { ...result, [key]: value.valueOf() };
    }
    return { ...result, [key]: value };
  }, {});
};

export const getColourCode = (colour) => {
  if (!colour || colour === '') return colour;

  if (colour.includes('#')) return colour;

  if (colour.split(',').length === 4) return `rgba(${colour})`;

  return `rgb(${colour})`;
};

export const normalizeStringToBreakTag = (value) => {
  return value?.replace(/(?:\r\n|\r|\n)/g, '<br>')?.replace(/<br>/g, '<br/>');
};

export const normalizeBreakTagToString = (value) => {
  return value?.replace(/<br\s*\/?>/gi, '\n');
};

const stringSorter = (a, b) => {
  return a?.localeCompare(b);
};

export const tableStringSorter = (a, b, { valuePropsName }) => {
  if (!valuePropsName) {
    return stringSorter(a, b);
  }
  return stringSorter(a[valuePropsName], b[valuePropsName]);
};
