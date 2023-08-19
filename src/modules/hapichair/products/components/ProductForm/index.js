import React, { useEffect, useState } from 'react';

// antd
import { Form, Input, message, Modal } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// hooks
import useForm from '@hooks/useForm';

// common utils
import { getRandomString, normalizeStringToBreakTag } from '@utils/methods';

// components
import PageHeaderContainer from '@components/PageHeaderContainer';
import PageHeaderComponent from '@components/PageHeaderComponent';
import ProductMainInfoSection from '../../sections/ProductMainInfoSection';
import ProductPriceSection from '../../sections/ProductPriceSection';
import ProductColorVariantAndOptionSection from '../../sections/ProductColorVariantAndOptionSection';
import ProductStatusSection from '../../sections/ProductStatusSection';
import ProductFilteringAttributesSection from '../../sections/ProductFilteringAttributesSection';
import ProductDeliveryOptionSection from '../../sections/ProductDeliveryOptionsSection';
import ProductDeliveryOptionsOverrideSection from '../../sections/ProductDeliveryOptionsOverrideSection';
import DescriptionSection from '../../sections/DescriptionSection';

// utils
import { defaultDescription } from '../../utils';

// styling
import styles from './index.module.less';

const defaultInitialValues = {
  status: 'UNPUBLISHED',
  merchantId: null,
  discountType: 'percent',
  priceRange: false,
  price: null,
  salePrice: 0,
  percentOff: null,
  width: null,
  height: null,
  depth: null,
  enable3D: false,
  variants: [],
  attributes: [],
  descriptions: [
    { ...defaultDescription, tempId: getRandomString(), title: 'Product Specs' },
    { ...defaultDescription, tempId: getRandomString(), title: 'Dimensions' },
  ],
  priceTiers: [],
  optionGroups: [],
  deliveryOverrides: [],
};

const ProductForm = ({ initialValues, onSave }) => {
  const dispatch = useDispatch();
  const formInitialValues = initialValues ?? defaultInitialValues;
  const [tempMerchantId, setTempMerchantId] = useState(formInitialValues?.merchantId);

  const { form, onFieldsChange, onFormSave, canSubmitForm, triggerCompare } = useForm({
    initialValues: formInitialValues,
    name: '2BProductForm',
    forceUpdateFields: [
      'variants',
      'optionGroups',
      'deliveryOverrides',
      'priceTiers',
      'materials',
      'tags',
      'descriptions',
      'medias',
      'video',
    ],
  });

  const merchantDeliveryOptions = useSelector(
    (state) => state.hchair.products.merchantDeliveryOptions,
  );

  const validateProductVariants = (v) => {
    const { variants } = v;
    if (!variants || variants?.length === 0) {
      throw Error('Must have at least one product variant');
    }
  };

  const validateMaterialsTags = (values) => {
    const { materials, tags } = values;
    return {
      materials: materials ? materials.toString() : undefined,
      tags: tags ? tags.toString() : undefined,
    };
  };

  const handleFormFinish = (values) => {
    try {
      validateProductVariants(values);
      const modValues = {
        ...values,
        ...validateMaterialsTags(values),
        variants: values.variants.map((variant, index) => ({ ...variant, hero: index === 0 })),
        descriptions: values.descriptions?.map((desc) => ({
          ...desc,
          content: normalizeStringToBreakTag(desc.content),
        })),
      };

      onSave(modValues);
    } catch (error) {
      message.error(error.message);
    }
  };

  const updateDeliveryOptionOverride = () => {
    const { deliveryOverrides = [], merchantId } = form.getFieldsValue();

    if (deliveryOverrides.length === 0) return;

    const [firstMerchantId] = merchantDeliveryOptions.map((opt) => opt.merchantId);

    if (!firstMerchantId || merchantId !== firstMerchantId) {
      form.setFieldsValue({
        deliveryOverrides: [],
      });
    }
  };

  const getMerchantDeliveryOptions = async (merchantId) => {
    if (!merchantId) return;

    await dispatch(hchair.products.getMerchantDeliveryOptions(merchantId));
  };

  const revertMerchantId = () => {
    form.setFieldsValue({
      merchantId: tempMerchantId,
    });

    triggerCompare();
  };

  const confirmChangeMerchant = () => {
    const merchantId = form.getFieldValue('merchantId');
    setTempMerchantId(merchantId);
    getMerchantDeliveryOptions(merchantId);
    updateDeliveryOptionOverride();
    triggerCompare();
  };

  const promptChangeMerchantConfirmation = () => {
    Modal.confirm({
      title: 'Confirm change merchant?',
      content: 'Changing merchant will remove existing delivery options override. Continue?',
      onCancel: revertMerchantId,
      onOk: confirmChangeMerchant,
    });
  };

  const updateMedias = (changedValues, allValues) => {
    const { video } = changedValues;
    const { medias } = allValues;
    const hasVideoMedia = medias.find((media) => media.type === 'VIDEO');

    // delete all string from Video Link should remove video media from medias array
    if (!video) {
      form.setFieldsValue({
        medias: medias.filter((media) => media.type !== 'VIDEO'),
      });
      triggerCompare();
      return;
    }

    // if already has video media, do update, else insert into medias array
    if (hasVideoMedia) {
      const newMedias = medias.map((media) =>
        media.type === 'VIDEO' ? { ...media, url: video } : media,
      );
      form.setFieldsValue({
        medias: newMedias,
      });
    } else {
      form.setFieldsValue({
        medias: [...medias, { type: 'VIDEO', url: video, name: '' }],
      });
    }
    triggerCompare();
  };

  const handleValuesChange = (changedValues, allValues) => {
    const keys = Object.keys(changedValues);

    if (keys.includes('merchantId')) {
      if (allValues?.deliveryOverrides.length > 0) {
        promptChangeMerchantConfirmation();
      } else {
        confirmChangeMerchant();
      }
      return;
    }

    if (keys.includes('video')) {
      updateMedias(changedValues, allValues);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(hchair.products.resetProductDetails());
    };
  }, [dispatch]);

  return (
    <PageHeaderContainer
      showHeader
      custom
      header={<PageHeaderComponent onSave={onFormSave} disableSave={!canSubmitForm} />}
    >
      <Form
        preserve
        layout="vertical"
        form={form}
        initialValues={initialValues ?? defaultInitialValues}
        onValuesChange={handleValuesChange}
        onFieldsChange={onFieldsChange}
        onFinish={handleFormFinish}
      >
        <Form.Item name="_id" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="enable3D" hidden>
          <Input />
        </Form.Item>

        <div className={styles.container}>
          <div>
            <ProductMainInfoSection />
            <ProductPriceSection form={form} triggerCompare={triggerCompare} />
            <ProductColorVariantAndOptionSection form={form} triggerCompare={triggerCompare} />
            <DescriptionSection form={form} triggerCompare={triggerCompare} />
          </div>
          <div>
            <ProductStatusSection />
            <ProductFilteringAttributesSection />
            <ProductDeliveryOptionSection />
            <ProductDeliveryOptionsOverrideSection form={form} triggerCompare={triggerCompare} />
          </div>
        </div>
      </Form>
    </PageHeaderContainer>
  );
};

export default ProductForm;
