import React, { useEffect, useState } from 'react';

// antd
import { Card, Input, InputNumber, Row, Col, Empty, Modal, Button, Form, Switch } from 'antd';

import {
  DeleteOutlined,
  DeleteTwoTone,
  PlusCircleOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';

// styling
import styles from './index.module.less';

const PriceTierSection = ({ form, triggerCompare }) => {
  const [showPriceTierPrompt, setShowPriceTierPrompt] = useState(false);
  const [enablePriceTier, setEnablePriceTier] = useState(false);
  const [priceTierCount, setPriceTierCount] = useState(0);

  useEffect(() => {
    const { priceTiers } = form.getFieldsValue();
    if (priceTiers && priceTiers.length > 0) {
      setPriceTierCount(priceTiers.length);
      setEnablePriceTier(true);
    }
  }, [form]);

  const disablePriceTier = () => {
    form.setFieldsValue({ priceTiers: [] });
    setShowPriceTierPrompt(false);
    setEnablePriceTier(false);
    triggerCompare();
  };

  const handleEnablePriceTier = (event) => {
    const { moq, priceTiers, retailPrice } = form.getFieldsValue();

    if (!event) {
      setShowPriceTierPrompt(true);
    } else {
      setEnablePriceTier(event);
      if (priceTiers.length === 0) {
        const tier = {
          seqId: 1,
          minQty: moq ?? 0,
          maxQty: '',
          price: retailPrice ?? 0,
        };
        form.setFieldsValue({ priceTiers: [...priceTiers, ...[tier]] });
      } else {
        form.setFieldsValue({ priceTiers });
      }
      triggerCompare();
    }
  };

  const deleteItem = (evt, item) => {
    evt.stopPropagation();
    const { priceTiers } = form.getFieldsValue();
    let ctr = 0;
    const filtered = priceTiers
      .filter((c) => c.seqId !== item.seqId)
      .map((pt) => {
        ctr += 1;
        return {
          ...pt,
          seqId: ctr,
        };
      });

    form.setFieldsValue({ priceTiers: filtered });
    triggerCompare();
    setPriceTierCount(filtered.length);
  };

  const handlePriceTier = (value, fld, item) => {
    const { priceTiers } = form.getFieldsValue();
    let payload = { [fld]: value };

    if (priceTiers) {
      const modPriceTiers = priceTiers.map((pTiers) => {
        let returnObj = { ...pTiers };
        if (pTiers.seqId === item.seqId) {
          returnObj = { ...pTiers, [fld]: value };
        }
        return returnObj;
      });
      payload = { priceTiers: modPriceTiers };
    } else {
      const ptier = {
        ...item,
        [fld]: value,
      };
      payload = { priceTiers: [ptier] };
    }

    form.setFieldsValue(payload);
    triggerCompare();
  };

  const addTierTrio = (item, idx) => {
    return (
      <div key={idx} style={{ display: 'flex', alignItems: idx === 0 ? 'center' : 'baseline' }}>
        <div style={{ flex: 1 }} className={styles.gridTriContainer}>
          <Form.Item label={idx === 0 ? 'Min Qty' : ''}>
            <InputNumber
              className="product-num-input"
              value={item.minQty}
              name="minQty"
              disabled={!enablePriceTier || idx === 0}
              onChange={(e) => handlePriceTier(e, 'minQty', item)}
            />
          </Form.Item>
          <Form.Item label={idx === 0 ? 'Max Qty' : ''}>
            <InputNumber
              className="product-num-input"
              value={item.maxQty}
              name="maxQty"
              disabled={!enablePriceTier}
              onChange={(e) => handlePriceTier(e, 'maxQty', item)}
            />
          </Form.Item>
          <Form.Item label={idx === 0 ? 'Price' : ''}>
            <InputNumber
              className="product-num-input"
              value={item.price}
              name="price"
              disabled={!enablePriceTier || idx === 0}
              onChange={(e) => handlePriceTier(e, 'price', item)}
            />
          </Form.Item>
        </div>

        {!enablePriceTier ? (
          <DeleteOutlined style={{ fontSize: 18 }} />
        ) : (
          <>
            <DeleteTwoTone
              hidden={idx === 0}
              onClick={(e) => deleteItem(e, item)}
              style={{ fontSize: 18 }}
            />
            <DeleteOutlined hidden={idx > 0} style={{ fontSize: 18 }} />
          </>
        )}
      </div>
    );
  };

  const priceTierDisabled = () => {
    return !enablePriceTier || priceTierCount > 3;
  };

  const priceTierMax = () => {
    const { priceTiers } = form.getFieldsValue();
    if (priceTiers) {
      const existing = priceTiers.filter((pTier) => pTier.maxQty === '-');
      if (existing && existing.length > 0) {
        return true;
      }
    }
    return false;
  };

  const handleAddTier = (evt) => {
    evt.stopPropagation();
    const { priceTiers } = form.getFieldsValue();
    let minQty = '';
    if (priceTiers.length > 0) {
      minQty = +priceTiers[priceTiers.length - 1].maxQty;
    }
    const tier = {
      seqId: priceTiers.length + 1,
      minQty,
      maxQty: '',
      price: '',
    };

    form.setFieldsValue({ priceTiers: [...priceTiers, ...[tier]] });
    triggerCompare();
    setPriceTierCount(priceTiers.length + 1);
  };

  const handleCloseModal = () => {
    setShowPriceTierPrompt(false);
  };

  if (!form) return null;

  return (
    <>
      <Modal
        title="Price Tiers"
        centered
        visible={showPriceTierPrompt}
        onCancel={handleCloseModal}
        onOk={disablePriceTier}
        width={286}
        okText="Yes"
        cancelText="No"
      >
        <p>Disabling price tiers will remove existing price tier set. Continue?</p>
      </Modal>

      <Card bordered>
        <Form.Item label="Price Tiers (Leave it blank for quantity or more on 'Max Qty')">
          <Switch checked={enablePriceTier} onChange={handleEnablePriceTier} />
        </Form.Item>

        <Form.Item name="priceTiers" hidden>
          <Input />
        </Form.Item>

        <Form.Item shouldUpdate noStyle>
          {({ getFieldValue }) => {
            const pT = getFieldValue('priceTiers');
            if (pT?.length === 0) return <Empty description="No Price tiers" />;

            return pT?.map((item, index) => addTierTrio(item, index));
          }}
        </Form.Item>

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Form.Item>
              <Button disabled={priceTierMax() || priceTierDisabled()} onClick={handleAddTier}>
                Add More{' '}
                {priceTierMax() || priceTierDisabled() ? (
                  <PlusCircleOutlined />
                ) : (
                  <PlusCircleTwoTone />
                )}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default PriceTierSection;
