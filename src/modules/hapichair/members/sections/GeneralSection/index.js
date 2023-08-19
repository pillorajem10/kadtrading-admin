import React from 'react';

// antd
import { message, Button, Form, Popconfirm, Space, Switch } from 'antd';

// redux
import { useDispatch } from 'react-redux';
import { common } from '@redux/combineActions';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';

// styling
import './index.less';

const GeneralSection = ({ form }) => {
  const dispatch = useDispatch();

  const handleResetPassword = () => {
    const { email } = form.getFieldsValue();
    dispatch(
      common.user.userForgotPassword({
        email,
        platform: '',
      })
    ).then(() => {
      message.success('Email reset link sent to member.');
    });
  };

  return (
    <DetailsSectionContainer title="General">
      <Form.Item label="VIP" name="vip" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Space direction="vertical">
        <Popconfirm
          disabled
          placement="topRight"
          title="Are you sure want to reset password for this member?"
          onConfirm={handleResetPassword}
          okText="Yes"
          cancelText="No"
        >
          <Button disabled type="link" size="small">
            Change/Reset Password
          </Button>
        </Popconfirm>

        <Button disabled type="link" size="small">
          Disable Account
        </Button>

        <Button disabled type="link" size="small">
          Delete Account
        </Button>
      </Space>

    </DetailsSectionContainer>
  );
};

export default GeneralSection;
