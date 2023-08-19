import React from 'react';

// antd
import { Button, Upload } from 'antd';

const AttachmentUploader = ({
  container,
  prefix,
  multiple = false,
  buttonText = 'Upload',
  uploadProps = {},
  buttonProps = {},
  onUploadSuccess,
}) => {
  const baseUrl = `/common-api/files?container=${container}&prefix=${prefix}`;

  const props = {
    name: 'file',
    multiple,
    action: baseUrl,
    showUploadList: {
      showRemoveIcon: false,
    },
    onChange: (info) => {
      const { file } = info;
      const { status } = file;

      if (status === 'done') {
        const { response, name } = file;

        if (onUploadSuccess) {
          onUploadSuccess({ url: response.data, filename: name });
        }
      }
    },
    ...uploadProps,
  };

  return (
    <Upload {...props}>
      <Button {...buttonProps}>{buttonText}</Button>
    </Upload>
  );
};

export default AttachmentUploader;
