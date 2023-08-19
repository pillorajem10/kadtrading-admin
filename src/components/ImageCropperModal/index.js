import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "../../../node_modules/cropperjs/dist/cropper.css";

import { Button, Modal } from 'antd';

const ImageCropperModal = ({ image, aspectRatio, cropperParams, visible, onOk, onCancel }) => {
  const cropperRef = useRef();
  const [dataUrl, setDataUrl] = useState('');

  const handleCrop = (evt) => {
    evt.target.cropper.getCroppedCanvas().toBlob((blob) => {
      const imageFile = new File([blob], 'x.png', {type: "image/png" });
      setDataUrl(imageFile);
    });
  };

  const handleCropEnd = (evt) => {
    evt.target.cropper.getCroppedCanvas(cropperParams || {}).toBlob((blob) => {
      const imageFile = new File([blob], 'x.png', {type: "image/png" });
      setDataUrl(imageFile);
    });
  };

  const handleCloseModal = () => {
    onCancel();
  };

  const handleOkClick = () => {
    onOk(dataUrl);
  };

  return (
    <Modal
      title="Crop Image"
      centered
      visible={visible}
      width={786}
      footer={[
        <Button key="back" onClick={handleCloseModal}>
          Cancel
        </Button>,
        <Button disabled={dataUrl === ''}
          key="submit" type="primary" onClick={handleOkClick}>
          Done
        </Button>,
      ]}
    >
      <Cropper
        ref={cropperRef}
        src={image}
        autoCropArea={1}
        style={{ height: 400, maxWidth: '100%' }}
        aspectRatio={aspectRatio}
        guides={false}
        crop={handleCrop}
        cropend={handleCropEnd}
      />
    </Modal>
  );
};

export default ImageCropperModal;
