import React from 'react';
import moment from 'moment';

// constants
import { dateFormat } from '@constants';

const ListDateTimeLabel = ({ value }) => {
  if (!value) return null;

  return <p>{moment(value).format(dateFormat.displayDateTime)}</p>;
};

export default ListDateTimeLabel;
