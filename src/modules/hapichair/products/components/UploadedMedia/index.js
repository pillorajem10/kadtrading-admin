import React, { useState } from 'react';

// antd
import { Form, Input, message, Upload } from 'antd';

// antd icons
import { UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const fileType = {
  application: 'DOC', // pdf type = application/pdf
  video: 'VIDEO', // video type = video/*
};

const fiveMB = 5000000;

const UploadedMedia = ({ form, medias, triggerCompare }) => {
  const [fileList, setFileList] = useState(
    medias?.map((media) => ({ ...media, uid: media.url })) ?? [],
  );

  const draggerProps = {
    name: 'file',
    accept: '.pdf',
    multiple: true,
    action: '/common-api/files?container=product&prefix=pdoc',
    fileList,
    beforeUpload: (info) => {
      if (info.size > fiveMB) {
        message.error(`${info.name} is greater than 5mb.`);
        return false;
      }
      return true;
    },
    onChange: (info) => {
      const { file } = info;
      const { status, type } = file;

      if (status === 'removed') {
        form.setFieldsValue({ medias: fileList.filter((media) => media.url !== file.url) });
        setFileList((state) => state.filter((media) => media.url !== file.url));
        triggerCompare();
        return;
      }

      const newMedias = info.fileList
        .map((fileItem) => {
          // return null for rejected files from beforeUpload handler
          if (fileItem.size && fileItem.size > fiveMB) {
            return null;
          }

          // existing saved files
          if (!fileItem.response) {
            return fileItem;
          }

          // newly successfully uploaded files
          if (fileItem.status === 'done' && fileItem.response) {
            const mediaFile = {
              name: fileItem.name,
              type: fileType[type.split('/')[0].toLowerCase()],
              url: fileItem.response.data.url,
              uid: fileItem.response.data.url,
            };
            return mediaFile;
          }
          return null;
        })
        .filter((fileItem) => fileItem);

      form.setFieldsValue({ medias: newMedias });
      setFileList(newMedias);
      triggerCompare();

      if (status === 'done') {
        message.success(`Files uploaded successfully.`);
      }
    },
  };

  return (
    <>
      <Form.Item name="medias" hidden>
        <Input />
      </Form.Item>

      <Dragger {...draggerProps}>
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </Dragger>
    </>
  );
};

export default UploadedMedia;
