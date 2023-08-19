import React, { useMemo, useState } from 'react';

// antd
import { Form, Input } from 'antd';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';

const MerchantPaymentTermsSection = ({ form }) => {
  const [wordCount, setWordCount] = useState(0);
  const { paymentTerms } = form.getFieldsValue();

  const initialCount = useMemo(() => {
    return paymentTerms?.length
  }, [paymentTerms]);

  const handleChange = () => {
    const pTerms = form.getFieldValue('paymentTerms');
    setWordCount(pTerms?.length ?? 0);
  };

  return (
    <DetailsSectionContainer>
      <div className="flex-start-space-between">
        <p className="mb-24">Payment Terms</p>
        <p className="mb-24">{initialCount ?? wordCount}/150</p>
      </div>
      <Form.Item
        name="paymentTerms">
        <Input.TextArea
          onChange={handleChange}
          rows={6}
          allowClear
          maxLength={150}
        />
      </Form.Item>
    </DetailsSectionContainer>
  );
};

export default MerchantPaymentTermsSection;
