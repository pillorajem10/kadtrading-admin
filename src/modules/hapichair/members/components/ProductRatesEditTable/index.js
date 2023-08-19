import React from 'react';

// antd
import { Form, InputNumber, Table, Typography } from 'antd';

// utils
import { getRandomString } from '@utils/methods';
import { productRatesColumn } from '../../sections/ProductRatesListSection/utils';


const { Text } = Typography;

const ProductRatesEditTable = ({ buttonRef, dataSource, form, validateAmount }) => {
  const formGotValues = (f) => {
    let result = false;
    if (Object.keys(f).length > 0) {
      const change = Object.keys(f)
      .filter(h => (validateAmount(f[h]) && f[h] !== null))
      .map(val => f[val]);
      if (change.length > 0) {
        result = true;
      }
    }
    return result;
  };

  const handleFormValuesChange = () => {
    buttonRef.current.disabled = !formGotValues(form.getFieldsValue());
  };

  const dataSourceWithKey = () => {
    return [{
      ...dataSource,
      key: getRandomString(),
    }];
  }

  const mergedColumns = productRatesColumn.map(col => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        alias: col.alias,
      }),
    };
  });

  // : React.FC<EditableCellProps>
  const EditableCell = ({
    dataIndex,
    title,
    alias,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {

    let gotPriceTier = true;
    let seqId = title.slice(-1);
    const isPriceTier = title.indexOf('Tier') > -1;
    if (isPriceTier) {
      if (record.priceTiers.length > 0) {
        seqId = title.slice(-1);
        const tier = record.priceTiers.find((pTier) => pTier.seqId === +seqId);
        if (!tier) {
          gotPriceTier = false;
        }
      } else {
        gotPriceTier = false;
      }
    }

    return (
      <td {...restProps}>
          {(dataIndex === 'retailPrice' || dataIndex === 'image' ||
            dataIndex === 'name') ? (
            children
          ) : (
              <>
              {title === 'Exclusive Price' &&
                <>
                  {children}
                  <div style={{ marginTop: 5, display: 'flex',
                    alignItems: 'baseline', justifyContent: 'space-between',
                    width: '100%', fontSize: 11 }}>
                    <Text style={{ flex: 1 }}>$</Text>
                    <div>
                      <Form.Item
                        name={alias}
                        style={{ margin: 0 }}
                      >
                        <InputNumber
                          placeholder="Enter amount"
                          className="member-num-input"
                          size="small"
                          style={{ right: -30, border: 0 }} />
                      </Form.Item>
                    </div>
                  </div>
                </>
              }

              {(gotPriceTier && isPriceTier) &&
                <>
                  {children}
                  <div style={{ marginTop: +seqId === 1 ? 20 : 5, display: 'flex',
                    alignItems: 'baseline', justifyContent: 'space-between',
                    width: '100%', fontSize: 11 }}>
                      <Text>{+seqId === 1 ? <>&nbsp;</> : '$'}</Text>
                      <Form.Item
                        hidden={+seqId === 1}
                        name={alias}
                        style={{ margin: 0 }}
                      >
                        <InputNumber
                          placeholder="Enter amount"
                          className="member-num-input"
                          size="small"
                          style={{ right: -30, border: 0 }} />
                      </Form.Item>
                    </div>
                </>
              }
            </>
          )}
      </td>
    );
  };

  if (!dataSource) return null;

  return (
    <div style={{ overflow: 'scroll', height: 420 }}>
      <Form
        form={form}
        initialValues={{
          price: '',
          pricetier1: '',
          pricetier2: '',
          pricetier3: '',
          pricetier4: '',
        }}
        onValuesChange={handleFormValuesChange}
        component={false}>
        <Table
         components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          pagination={false}
          columns={mergedColumns}
          dataSource={dataSourceWithKey()} size="small" />
      </Form>
    </div>
  );
};

export default ProductRatesEditTable;
