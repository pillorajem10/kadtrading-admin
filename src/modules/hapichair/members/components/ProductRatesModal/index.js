import React, { useCallback, useEffect, useRef } from 'react';

// antd
import { Button, Col, Divider, Form,
  Modal, Row, } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// components
import ProductRatesEditTable from "../ProductRatesEditTable";

// styles
import './index.less';

const ProductRatesModal = ({ visible, member, onOk, onCancel }) => {
  const dispatch = useDispatch();
  const { productRate } = useSelector(state => state.hchair.members);
  const buttonRef = useRef();
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      buttonRef.current.disabled = true;
    }
  }, [visible]);

  const updatePriceTier = useCallback((seqId, amount, memberId) => {
    const pTier = productRate.priceTiers.find(p => p.seqId === +seqId);

    if (pTier) {
      if (pTier.corpTierId && pTier.corpTierId !== null) {
        const priceTier = {
          seqId: +seqId,
          id: pTier.corpTierId,
          minQty: pTier.minQty,
          maxQty: pTier.maxQty,
          price: amount,
          corpId: memberId,
        }
        if (priceTier.maxQty === null) delete priceTier.maxQty;
        dispatch(hchair.members.updateMemberPriceTier({ ...priceTier, productId: productRate.id }));
      } else {
        const priceTier = {
          productId: productRate.id,
          seqId: +seqId,
          minQty: pTier.minQty,
          maxQty: pTier.maxQty,
          price: amount,
          corpId: memberId,
        }
        if (priceTier.maxQty === null) delete priceTier.maxQty;
        dispatch(hchair.members.addPriceTier(priceTier));
      }
    }
  }, [dispatch, productRate]);

  const updateCorporatePrice = (amount) => {
    if (productRate.corporatePriceId !== null) {
      const exclPrice = {
        id: productRate.corporatePriceId,
        price: amount,
      }
      dispatch(hchair.members.updateMemberCorporatePrice({ ...exclPrice, corpId: member.id, productId: productRate.id }))
      .then(() => updatePriceTier(1, amount, member.id));
    } else {
      const exclPrice = {
        productId: productRate.id,
        corpId: member.id,
        price: amount,
      }
      dispatch(hchair.members.addCorporatePrice(exclPrice))
      .then(() => updatePriceTier(1, amount, member.id));
    }
  };

  const validateAmount = (amount) => {
    return amount && typeof amount === 'number' ;
  };

  const handleSaveModal = () => {
    const amountObj = form.getFieldsValue();

    if (productRate && validateAmount(amountObj.price)) {
      updateCorporatePrice(amountObj.price);
    }

    Object.keys(amountObj).map(async(fld) => {
      if (validateAmount(amountObj[fld]) && fld.indexOf('pricetier') > -1 && productRate) {
        const seqId = fld.slice(-1);
        if (+seqId > 1) {
          await updatePriceTier(seqId, amountObj[fld], member.id);
        }
      }
      return fld;
    });

    form.resetFields();
    onOk();
  };

  const handleCloseModal = () => {
    form.resetFields();
    onCancel();
  }

  const formGotValues = () => {
    return true;
  };

  return (
    <Modal
      title="Edit Product Rates/Prices"
      centered
      visible={visible}
      onCancel={handleCloseModal}
      width="90%"
      footer={null}
    >
      <Row style={{ padding: 0 }} gutter={2}>
        <Col span={24} style={{ paddingRight: 20, textAlign: 'right' }}>
          <>
            <Button style={{ marginRight: 10 }} onClick={handleCloseModal} >
              Cancel
            </Button>
            <Button
              ref={buttonRef}
              type="primary" style={{ marginRight: 10 }} onClick={handleSaveModal} >
              Save
            </Button>
          </>
        </Col>
      </Row>
      <Divider />
      <ProductRatesEditTable
        buttonRef={buttonRef}
        canBeSaved={(v) => formGotValues(v)}
        form={form}
        dataSource={productRate}
        validateAmount={validateAmount}
        />
    </Modal>
  );
};

export default ProductRatesModal;
