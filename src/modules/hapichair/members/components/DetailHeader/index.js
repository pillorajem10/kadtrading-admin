import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// antd
import { message, Affix, Button, PageHeader, Popconfirm } from 'antd';

// antd icons
import { LeftCircleOutlined } from '@ant-design/icons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { hchair } from '@redux/combineActions';

// Styling
import './index.less';

const DetailHeader = ({ refreshDetail, tabNumber }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { location } = history;
  const [id] = useState(location.search.split('=')[1]);
  const { member, memberForm, productRates } = useSelector((state) => state.hchair.members);

  const canBeUpdated = () => {
    return Object.keys(memberForm).length > 1;
  };

  const canBeSaved = () => {
    const { firstName, lastName, email,
      mobile, corp } = memberForm;

    return (
      (firstName && firstName !== '') &&
      (lastName && lastName !== '') &&
      (email && email !== '') &&
      (mobile && mobile !== '') &&
      (corp && Object.keys(corp).length > 0)
    );

  };

  const handleResetPrice = () => {
    productRates.map(product => {
        const payload = {
          productId: product.id,
          corpId: member.id,
          tiers: []
        };
        dispatch(hchair.members.resetProductRatePrices(payload));
        if (product.corporatePriceId !== null) {
          dispatch(hchair.members.removeCorporatePrice(product.corporatePriceId));
        }
        return product;
    });
    setTimeout(() => {
      history.push(`/hapichair/members`);
      history.push(`/hapichair/members?id=${member.id}`);
      message.success('Product rates has been reset.')
    }, 500);
  };

  const handleSave = () => {
    const payload = JSON.parse(JSON.stringify(memberForm));
    if (id === 'new') {
      payload.forcePwdChange = true;
      dispatch(hchair.members.addMember(payload))
      .then((res) => {
        const { success, data } = res;
        if (success) {
          message.success('Member saved.');
          history.push(`/hapichair/members?id=${data.id}`);
        }
      })
    } else {
      delete payload.email;
      dispatch(hchair.members.updateMember(payload))
      .then((res) => {
        const { success } = res;
        if (success) {
          dispatch(hchair.members.setMemberForm({ id }));
          message.success('Member updated.');
          history.push(`/hapichair/members?id=${id}`);
          refreshDetail();
        }
      })
    }
  }

  return (
    <Affix offsetTop={10}>
      <PageHeader
        className="add-member-header-container"
        title={(member && member.firstName && member.lastName)
          ? `${member.firstName} ${member.lastName}`
          : 'New Member'
        }>
        <div className="add-member-header-actions-container">
          <div
            className="add-member-header-back-btn"
            onClick={() => history.push('/hapichair/members')}
          >
            <LeftCircleOutlined />
            All Members
          </div>

          <div className="add-member-header-btn-group">
            {tabNumber === 3 &&
              <Popconfirm
                disabled
                placement="topLeft"
                title="Are you sure want to reset prices?"
                onConfirm={handleResetPrice}
                okText="Yes"
                cancelText="No"
              >
                <Button disabled type="primary">Reset Prices</Button>
              </Popconfirm>
            }
            {tabNumber === 1 &&
              <Button disabled={memberForm.id ? !canBeUpdated() : !canBeSaved()} type="primary" onClick={handleSave}>
                {memberForm.id ? 'Update Member' : 'Save Member'}
              </Button>
            }
          </div>
        </div>
      </PageHeader>
    </Affix>
  );
};

export default DetailHeader;
