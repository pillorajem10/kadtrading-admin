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
import MainCalculationInfoSection from '../../sections/MainCalculationInfoSection';

// styling
import styles from './index.module.less';

const { TabPane } = Tabs;

const defaultInitialValues = {
	represent: '',
	dtype: '',
	gst: '0.07',
	currency: 'SGD',
	markup: '0.17',
	shipping: '200',
	logistics: '',
	name: 'Product Calculation',
};

const CalculationForm = ({ initialValues, onSave }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { form, onFieldsChange, onFormSave, canSubmitForm, resetDirty } = useForm({
    initialValues: initialValues ?? defaultInitialValues,
    name: 'CalculationForm',
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
      dispatch(hchair.calculations.resetCalculationDetails());
    };
  }, [dispatch]);

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
        <TabPane tab="Calculation Overview" key="1">
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
                <MainCalculationInfoSection form={form} />
              </div>
              <div>
                {/*
                <GeneralSection form={form} />                
                */}

              </div>
            </div>
          </Form>
        </TabPane>
      </Tabs>
    </PageHeaderContainer>
  );
};

export default CalculationForm;
