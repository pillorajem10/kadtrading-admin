import React from 'react';

// antd
import { Form, Switch } from 'antd';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';

const MerchantGeneralSection = () => {
  return (
    <DetailsSectionContainer title="General">
      <Form.Item label="Active" name="active" valuePropName="checked">
        <Switch />
      </Form.Item>
    </DetailsSectionContainer>
  );
};

export default MerchantGeneralSection;
