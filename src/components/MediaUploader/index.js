import React, { useState } from 'react';

// antd
import { Button, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

// assets
import noProductImage from '@images/no-product-skeleton.svg';

// styling
import styles from './index.module.less';

const { Dragger } = Upload;
const token = localStorage.getItem('token');

const Uploader = ({
  noCrop = false,
  value,
  container = '',
  prefix = 'logo',
  width = 400,
  height = 400,
  thumbnailCSS = {},
  onUploadFinish,
  onChange,
  children,
  ...restProps
}) => {
  const [useFallbackImg, setUseFallbackImgSrc] = useState();

  const baseUrl = process.env.NODE_ENV === 'development' ? `/common-api/files?container=${container}` : `/api-v1/common-api/files?container=${container}`;

  const displayImgSrc = useFallbackImg ? noProductImage : value;

  const {
    showUploadList = {
      showRemoveIcon: false,
    },
  } = restProps;

  const props = {
    name: 'file',
    multiple: restProps?.multiple,
    accept: 'image/*',
    action: `${baseUrl}&prefix=${prefix}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    showUploadList,
    onChange: (info) => {
      const { file } = info;

      const { status } = file;

      if (status === 'done') {
        const { response } = file;
        if (onUploadFinish) onUploadFinish(response.data.url);

        if (onChange) onChange(response.data);
      }
    },
  };

  const handleRemove = () => {
    onChange('');
  };

  if (value) {
    return (
      <div className="align-center">
        <div className="flex-center flex-col">
          <img
            src={displayImgSrc}
            alt=""
            className={styles.image}
            style={{ ...thumbnailCSS }}
            onError={() => {
              if (!useFallbackImg) setUseFallbackImgSrc(true);
            }}
          />
        </div>
        <div className="flex-center mt-8">
          <Button className="mr-8" type="danger" onClick={handleRemove}>
            Remove
          </Button>
          <Upload {...props}>
            <Button type="primary" ghost>
              Change
            </Button>
          </Upload>
        </div>
      </div>
    );
  }

  if (noCrop) {
    return (
      <Dragger {...props}>
        {children ?? (
          <>
            <p className={styles.placeholderIcon}>
              <InboxOutlined />
            </p>
            <p>Click or drag file here</p>
          </>
        )}
      </Dragger>
    );
  }

  return (
    <ImgCrop modalTitle="Crop Image" modalWidth="80%" aspect={width / height}>
      <Dragger {...props}>
        {children ?? (
          <>
            <p className={styles.placeholderIcon}>
              <InboxOutlined />
            </p>
            <p>Click or drag file here</p>
          </>
        )}
      </Dragger>
    </ImgCrop>
  );
};

export default Uploader;
