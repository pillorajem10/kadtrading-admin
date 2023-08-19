import React from 'react';

// antd
import { Col, Form, Row } from 'antd';

// common utils
import { getRandomString } from '@utils/methods';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';
import UploadedMedia from '../../components/UploadedMedia';
import DescriptionFieldInput from '../../components/DescriptionFieldInput';

// utils
import { defaultDescription } from '../../utils';

// styling
import styles from './index.module.less';

const DescriptionSection = ({ form, triggerCompare }) => {
  return (
    <DetailsSectionContainer title="Step 4 - Description">
      <div className={styles.descriptionContainer}>
        <p className={styles.descriptionTitle}>Product Description</p>

        <div className="mb-24">
          <Form.List name="descriptions">
            {(fields, { add, remove }) => {
              return (
                <Row gutter={8}>
                  {fields.map((field) => (
                    <Col span={12} key={field.fieldKey}>
                      <DescriptionFieldInput
                        field={field}
                        showRemove={fields.length > 1}
                        showAdd={field.name === fields.length - 1}
                        onRemove={remove}
                        onAdd={() => add({ ...defaultDescription, tempId: getRandomString() })}
                      />
                    </Col>
                  ))}
                </Row>
              );
            }}
          </Form.List>
        </div>

        <p className={styles.descriptionTitle}>Download Files (pdf only. Max file size: 5mb)</p>

        <UploadedMedia
          form={form}
          triggerCompare={triggerCompare}
          medias={form.getFieldValue('medias')}
        />
      </div>
    </DetailsSectionContainer>
  );
};

export default DescriptionSection;
