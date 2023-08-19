import React from 'react';

// antd
import { Button, Form, Input } from 'antd';

// components
import Uploader from '../Uploader';

// utils
import mediaSizeConfig from '../../utils/media-config';

const MediaInput = ({ name, children, triggerCompare }) => {
  const config = mediaSizeConfig[name];
  const { prefix, width, height, thumbnailSize, thumbnailCSS } = config;

  return (
    <div className="mb-24">
      <Form.Item name={name} noStyle hidden>
        <Input />
      </Form.Item>
      <Form.Item shouldUpdate noStyle>
        {({ getFieldValue, setFieldsValue }) => {
          const handleUploadFinish = (imgUrl) => {
            setFieldsValue({
              [name]: imgUrl,
            });
            triggerCompare();
          };

          const handleRemoveImg = () => {
            setFieldsValue({
              [name]: '',
            });
            triggerCompare();
          };

          const imgUrl = getFieldValue(name);

          return (
            <>
              <div className="mb-16 flex-center-space-between">
                <div>{children}</div>
                {imgUrl && (
                  <Button type="danger" onClick={handleRemoveImg}>
                    Remove
                  </Button>
                )}
              </div>
              <Uploader
                prefix={prefix}
                width={width}
                height={height}
                thumbnailSize={thumbnailSize}
                thumbnailCSS={thumbnailCSS}
                onUploadFinish={handleUploadFinish}
                imgSrc={imgUrl}
              />
            </>
          );
        }}
      </Form.Item>
    </div>
  );
};

export default MediaInput;
