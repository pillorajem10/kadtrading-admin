import React, { useEffect } from 'react';

// antd
import { Row, Form, Input, Button } from 'antd';

// icons
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


// redux
import { useDispatch } from 'react-redux';
import { common } from '@redux/combineActions';

// picture
// import hapiChairLogo1 from '@images/shi2.png'
import hapiChairLogoTablet from '@images/shi2.png';

import { useDebounce } from '@utils/methods';

// styling
import styles from './index.module.less';

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = useDebounce((values) => {
    const payload = { ...values };
    dispatch(common.user.userLogin(payload));
  }, 500);

  useEffect(() => {
    return () => {}
  }, []);

  return (
    <>
    <div
      style={{ backgroundImage: `url("https://jumbo-gold-bucket.s3.us-east-2.amazonaws.com/settings/banner/abf5e2cb-38cc-4c78-a319-95c71f7c9c84_jumbo_gold.jpg")` }}
      className={styles.loginLayout}>

      <div className={styles.loginFormLayout}>
        <img className={styles.imgLogo} src={hapiChairLogoTablet} alt="jumbo" />

        <div>
          <p className={styles.loginHeader}>Please login to access the system.</p>

          <Form
            {...layout}
            form={form}
            initialValues={{ email: 'hapi.chair@gmail.com', password: 'abcd1234' }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="ID / Email"
              className={styles.input}
              name="email"
              rules={[{ required: true, message: 'Please input your ID / email!' }]}
            >
              <Input />
            </Form.Item>

            {/*
              <Input type="password" />
            */}
            <Form.Item
              label="Password"
              className={styles.input}
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                placeholder="Enter password" />
            </Form.Item>

            <Row className={styles.cta}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: '2.9rem' }}>
                Sign In
              </Button>
            </Row>


          </Form>
        </div>
      </div>
    </div>
          <div className={styles.footer}>[©2021 Hapi Chair Admin 1.0]</div>
          </>
  );
};

export default Login;
