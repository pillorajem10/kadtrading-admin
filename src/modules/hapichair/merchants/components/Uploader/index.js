import React, { useState } from 'react';

// antd
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

// assets
import noProductImage from '@images/no-product-skeleton.svg';

// styling
import styles from './index.module.less';

const { Dragger } = Upload;
const token = localStorage.getItem('token');

const Uploader = ({
  imgSrc,
  prefix = 'logo',
  width = 400,
  height = 400,
  thumbnailCSS = {},
  onUploadFinish,
}) => {
  const [useFallbackImg, setUseFallbackImgSrc] = useState();

  const baseUrl = '/common-api/files?container=merchant';

  const displayImgSrc = useFallbackImg ? noProductImage : imgSrc;

  const props = {
    name: 'file',
    multiple: false,
    action: `${baseUrl}&prefix=${prefix}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onChange: (info) => {
      const { file } = info;

      const { status } = file;

      if (status === 'done') {
        const { response } = file;
        onUploadFinish(response.data.url);
      }
    },
  };

  if (imgSrc) {
    return (
      <div className="flex-center">
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
    );
  }

  return (
    <ImgCrop modalTitle="Crop Image" modalWidth="80%" aspect={width / height}>
      <Dragger
        {...props}
        showUploadList={{
          removeIcon: false,
        }}
      >
        <p className={styles.placeholderIcon}>
          <InboxOutlined />
        </p>
        <p>Click or drag file here</p>
      </Dragger>
    </ImgCrop>
  );
};

export default Uploader;
