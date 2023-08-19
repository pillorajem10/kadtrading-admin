import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// antd
import { Form, Input, Tabs, message } from 'antd';

// redux
import { useDispatch } from 'react-redux';
import { hchair } from '@redux/combineActions';

// constants
import ROUTE_PATHS from '@constants/paths';

// hooks
import useForm from '@hooks/useForm';

// components
import PageHeaderContainer from '@components/PageHeaderContainer';
import PageHeaderComponent from '@components/PageHeaderComponent';
import MainMemberInfoSection from '../../sections/MainMemberInfoSection';
import GeneralSection from '../../sections/GeneralSection';
// import CorporateSection from '../../sections/CorporateSection';
import ProductRatesListSection from '../../sections/ProductRatesListSection';

// styling
import styles from './index.module.less';

const { TabPane } = Tabs;

const defaultInitialValues = {
  countryCode: '+65',
  email: '',
  fname: '',
  lname: '',
  mobile: '',
  totalSpent: 0,
  vip: false,
  corp: {
    address: '',
    companyName: '',
    industry: '',
    position: '',
    postcode: '',
    uen: '',
    unit: '',
  }
};

const MemberForm = ({ initialValues, onSave }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { form, onFieldsChange, onFormSave, canSubmitForm, resetDirty } = useForm({
    initialValues: initialValues ?? defaultInitialValues,
    name: 'MemberForm',
    resetDirtyOnSubmit: false,
  });

  const handleFormFinish = (values) => {
    try {
      const payload = {
        ...values,
      };
      onSave(payload);
      resetDirty();
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(hchair.members.resetMemberDetails());
    };
  }, [dispatch]);

  const disableField = () => {
    const { _id } = form.getFieldsValue();
    return (_id && _id !== '');
  };

  const handleBack = () => {
    history.replace(ROUTE_PATHS.MEMBERS);
  };

  return (
    <PageHeaderContainer
      showHeader
      custom
      header={
        <PageHeaderComponent
          onBack={handleBack}
          onSave={onFormSave} disableSave={!canSubmitForm} />
      }
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <Form
            preserve
            layout="vertical"
            form={form}
            initialValues={initialValues ?? defaultInitialValues}
            onFieldsChange={onFieldsChange}
            onFinish={handleFormFinish}
          >
            <Form.Item name="_id" hidden>
              <Input />
            </Form.Item>
            <div className={styles.container}>
              <div>
                <MainMemberInfoSection form={form} />
                {/* <CorporateSection /> */}
              </div>
              <div>
                <GeneralSection form={form} />
              </div>
            </div>
          </Form>
        </TabPane>
        <TabPane disabled={!disableField()} tab="Product Rates" key="3">
          <ProductRatesListSection form={form} />
        </TabPane>
        <TabPane disabled tab="Address" key="2">
          Address
        </TabPane>
        <TabPane disabled tab="Timeline" key="4">
          Timeline
        </TabPane>
      </Tabs>
    </PageHeaderContainer>
  );
};

export default MemberForm;
