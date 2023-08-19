import React, { useEffect, useState } from 'react';

// antd
import { message, Upload } from 'antd';
import { LoadingOutlined, FileImageOutlined } from '@ant-design/icons';

import ImgCrop from 'antd-img-crop';

// styling
import './index.less';

const { Dragger } = Upload;

const ImageUploader = ({
  actionUrl = '/common-api/files',
  cropperAspectRatio = 1/1,
  cropperModalWidth = '80%',

  draggerMultiple = false,
  finalImageList = [],
  minZoom = 1,
  imageHeight = 200,
  imageWidth = '100%',
  existingImage = [],
  showGrayBackground = false,
  uploaderText = 'Click or drag file here.',
}) => {

  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingImage.length > 0) {
      if (draggerMultiple) {
        setImage(existingImage[0]);
      } else {
        setImage(existingImage[0]);
      }
    }
  }, [draggerMultiple, existingImage]);

  const draggerProps = {
    style: { height: imageHeight, width: imageWidth, background: '#fff', border: '0' },
    showUploadList: false,
    defaultFileList: [],
    accept: ".jpg,.jpeg,.png,.gif",
    name: 'file',
    multiple: draggerMultiple,
    action: actionUrl,
    onChange (info) {
      const { status } = info.file;
      setLoading(true);
      if (status === 'error') {
        setLoading(false);
        setImage('');
      }
      if (status === 'done') {
        setLoading(false);
        setImage(info.file.response.data);
        finalImageList(draggerMultiple ? info.fileList : info.file.response.data);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <ImgCrop
      aspect={cropperAspectRatio}
      grid
      quality={0.6}
      zoom
      modalTitle="Crop Image"
      modalWidth={cropperModalWidth}
      minZoom={minZoom}
      maxZoom={10}
      rotate>

      <Dragger {...draggerProps}>
        {loading &&
          <>
            <p className="ant-upload-drag-icon">
              <LoadingOutlined style={{ color: 'black', marginTop: 10, width: 120, height: 100 }} type="loading" />
            </p>
            <p className="ant-upload-text">Uploading image..</p>
          </>
        }

        {!loading && image !== '' &&
          <div
            style={{
              marginTop: -16,
              position: 'relative',
              height: imageHeight,
              width: imageWidth,
              backgroundImage: `url(${image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundColor: showGrayBackground ? '#a1a1a1' : '#fff',
            }} />
        }

        {!loading && image === '' &&
          <>
            <p className="ant-upload-drag-icon">
              <FileImageOutlined />
            </p>
            <p className="ant-upload-text">{uploaderText}</p>
          </>
        }

      </Dragger>
    </ImgCrop>
  );
};

export default ImageUploader;
