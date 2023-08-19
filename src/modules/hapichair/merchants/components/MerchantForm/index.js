import React from 'react';

// antd
import { Form, Input } from 'antd';

// hooks
import useForm from '@hooks/useForm';

// common utils
import { normalizeStringToBreakTag } from '@utils/methods';

// components
import PageHeaderContainer from '@components/PageHeaderContainer';
import PageHeaderComponent from '@components/PageHeaderComponent';
import MerchantMainInfoSection from '../../sections/MerchantMainInfoSection';
import MerchantGeneralSection from '../../sections/MerchantGeneralSection';
import MerchantCorporateInfoSection from '../../sections/MerchantCorporateInfoSection';
import MerchantCompanyProfileSection from '../../sections/MerchantCompanyProfileSection';
import MerchantDeliveryAndPoliciesSection from '../../sections/MerchantDeliveryAndPoliciesSection';
import MerchantMediaSection from '../../sections/MerchantMediaSection';
import MerchantPaymentTermsSection from '../../sections/MerchantPaymentTermsSection';

// styling
import styles from './index.module.less';

const defaultInitialValues = {
  countryCode: '+65',
  deliveryOptions: [],
};

const MerchantForm = ({ initialValues, onSave }) => {
  const formInitialValues = initialValues ?? defaultInitialValues;

  const { form, triggerCompare, onFieldsChange, onFormSave, canSubmitForm } = useForm({
    initialValues: formInitialValues,
    name: 'MerchantForm',
    forceUpdateFields: ['deliveryOptions'],
  });

  const normalizeRichText = (values) => {
    const { deliveryPolicy, returnPolicy, ...restValues } = values;

    return {
      ...restValues,
      deliveryPolicy: normalizeStringToBreakTag(deliveryPolicy),
      returnPolicy: normalizeStringToBreakTag(returnPolicy),
    };
  };

  const handleSave = async (values) => {
    const payload = normalizeRichText(values);
    await onSave(payload);
  };

  return (
    <PageHeaderContainer
      custom
      showHeader
      header={<PageHeaderComponent onSave={onFormSave} disableSave={!canSubmitForm} />}
    >
      <Form
        preserve
        layout="vertical"
        form={form}
        initialValues={formInitialValues}
        onFinish={handleSave}
        onFieldsChange={onFieldsChange}
        validateMessages={{
          // eslint-disable-next-line no-template-curly-in-string
          required: '${label} is required',
        }}
      >
        <Form.Item name="_id" hidden>
          <Input />
        </Form.Item>

        <div className={styles.container}>
          <div>
            <MerchantMainInfoSection />
            <MerchantCorporateInfoSection />
            <MerchantCompanyProfileSection form={form} triggerCompare={triggerCompare} />
            <MerchantDeliveryAndPoliciesSection form={form} triggerCompare={triggerCompare} />
          </div>

          <div>
            <MerchantGeneralSection />
            <MerchantMediaSection triggerCompare={triggerCompare} />
            <MerchantPaymentTermsSection form={form} />
          </div>
        </div>
      </Form>
    </PageHeaderContainer>
  );
};

export default MerchantForm;
