import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { LoadingOutlined, FileImageOutlined } from '@ant-design/icons';

import { getExtension } from '@utils/methods';
import { imageExtensions } from '@constants';

const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length);
  return  new Blob([ab], {type: mimeString});
};

const DropZoneComponent = ({
  handleUploadedFile,
  showMessage,
  imageWidth,
  imageHeight,
  image,
  uploading,
  showGrayBackground,
  uploaderText,
}) => {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 1) {
      acceptedFiles.forEach(file => {
        if (imageExtensions.includes(getExtension(file.name))) {
          const reader = new FileReader()
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = (v) => {
            const vvv = dataURItoBlob(v.target.result);
            const imageFile = new File([vvv], 'x.png', {type: "image/png" });
            handleUploadedFile(reader, imageFile);
          }
          reader.onloadend = () => {};
          reader.readAsDataURL(file);
        } else {
          showMessage({
            message: getExtension(file.name) === 'svg'
            ? 'SVG not supported.'
            : `${file.name} is not a valid image.`,
          });
        }
      });
    } else {
      showMessage({
        message: 'Multiple files not allowed.',
      });
    }
    // handleImageCount(acceptedFiles.length);
  }, [handleUploadedFile, showMessage])

  const { getRootProps, getInputProps } = useDropzone({onDrop})

  return (
    <div className="dig ant-upload ant-upload-drag"
      style={{
        border: 'none',
      }}>

      {uploading &&
        <>
          <p className="ant-upload-drag-icon">
            <LoadingOutlined style={{ color: 'black', marginTop: 10, width: 50, height: 50 }} type="loading" />
          </p>
          <p className="ant-upload-text">Uploading image..</p>
        </>
      }

      {!uploading && image !== '' &&
        <div
          style={{
            outline: 'none',
            marginTop: -16,
            position: 'relative',
            height: imageHeight,
            width: imageWidth,
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundColor: showGrayBackground ? '#a1a1a1' : '#fff',
          }} {...getRootProps()}>
          <input accept=".jpg,.jpeg,.png,.gif" {...getInputProps()} />
      </div>
      }

      {!uploading && image === '' &&
        <div {...getRootProps()}>
          <p className="ant-upload-drag-icon">
            <FileImageOutlined />
          </p>
          <p className="ant-upload-text">{`${uploaderText}`}</p>
          <input accept=".jpg,.jpeg,.png,.gif" {...getInputProps()} />
        </div>
      }
  </div>
  )
}

export default DropZoneComponent;
