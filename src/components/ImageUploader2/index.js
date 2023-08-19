import React, { useEffect, useState } from 'react';

import { message } from 'antd';

// redux
import { useDispatch } from 'react-redux';
import { common } from '@redux/combineActions';

import ImageCropperModal from '@components/ImageCropperModal';
import DropZoneComponent from '@components/DropZoneComponent';

// styling
import './index.less';

const ImageUploader2 = ({
  container = '',
  prefix = '',
  cropperAspectRatio = 1/1,
  cropperParams = {},
  draggerMultiple = false,
  finalImageList = [],
  imageHeight = 200,
  imageWidth = '100%',
  existingImage = [],
  showGrayBackground = false,
  uploaderText = 'Click or drag file here.',
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    if (existingImage.length > 0) {
      if (draggerMultiple) {
        setImage(existingImage[0]);
      } else {
        setImage(existingImage[0]);
      }
    }
  }, [draggerMultiple, existingImage]);

  const handleUploadedFile = (v) => {
    setImage(v.result);
    setShowCropper(true);
    setLoading(true);
  };

  const handleShowMessage = (e) => {
    message.error(e.message);
  };

  const handleCroppedFile = (url) => {
    dispatch(common.file.uploadImage({
      container,
      prefix,
      data: url
    })).then((res) => {
      finalImageList(res.data);
      setImage(res.data);
      setLoading(false);
      setShowCropper(false);
    });
  };

  const handleCropperOnCancel = () => {
    setLoading(false);
    setShowCropper(false);
  };

  return (
    <>
      <ImageCropperModal
        image={image}
        aspectRatio={cropperAspectRatio}
        cropperParams={cropperParams}
        visible={showCropper}
        onOk={(e, v) => handleCroppedFile(e, v)}
        onCancel={handleCropperOnCancel}
      />

      <DropZoneComponent
        handleUploadedFile={(v) => handleUploadedFile(v)}
        showMessage={handleShowMessage}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        image={image}
        uploading={loading}
        showGrayBackground={showGrayBackground}
        uploaderText={uploaderText}
        />
    </>
  );
};

export default ImageUploader2;
