import React from 'react';

// antd
import { Button, Form, Input } from 'antd';

// styling
import styles from './index.module.less';

const DescriptionFieldInput = ({ field, showRemove, showAdd, onRemove, onAdd }) => {
  return (
    <div className={styles.container}>
      <Form.Item
        label={`Description Title ${field.name + 1}`}
        fieldKey={[field.fieldKey, 'title']}
        name={[field.name, 'title']}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={`Description Content ${field.name + 1}`}
        fieldKey={[field.fieldKey, 'content']}
        name={[field.name, 'content']}
      >
        <Input.TextArea rows={6} maxLength={500} allowClear showCount />
      </Form.Item>

      <div className="align-right pt-16">
        {showRemove && <Button onClick={() => onRemove(field.name)}>Remove</Button>}
        {showAdd && (
          <Button className="ml-8" onClick={onAdd}>
            Add Description
          </Button>
        )}
      </div>
    </div>
  );
};

export default DescriptionFieldInput;
