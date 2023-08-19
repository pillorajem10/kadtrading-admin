import React from 'react';

// antd
import { Card, Form, Input, Row, message } from 'antd';

// react-dnd
import { useDrop } from 'react-dnd';

// components
import DraggableDiamondMedia from '@components/DraggableDiamondMedia';
import MediaUploader from '@components/MediaUploader';

// constants
import dndTypes from '@constants/dnd-types';

const MediaMultiInput = ({ name, children, triggerCompare }) => {

  const [, dropRef] = useDrop({
    accept: dndTypes.INHOUSE_IMAGE,
    canDrop: () => {
      // disallow drop from one variant field to another variant field
      // return item.variantFieldName === field.name;
      return true;
    },
  });

  return (
    <div className="mb-24">
      <Form.Item name={name} noStyle hidden>
        <Input />
      </Form.Item>
      <Form.Item shouldUpdate noStyle>
        {({ getFieldValue, setFieldsValue }) => {
          const mediaz = getFieldValue(name);
          const stockNo = getFieldValue('stockNo');

          const handleUploadFinish = (url) => {
            const newMedias = [...mediaz, url];
            message.success('File uploadedd ');
            setFieldsValue({
              [name]: newMedias,
            });
            triggerCompare();
          };
        
        
          const findItem = (imgSrc) => {
            const m = mediaz.filter(src => `${src}` === imgSrc)[0];
            return {
              image: m,
              index: mediaz.indexOf(m),
            };
          };
        
          const handleMoveVariantImage = (src, hoverIndex) => {
            const { image: dragImage, index: dragIndex } = findItem(src);
            const targetImage = mediaz[hoverIndex];
        
            const newMedias = mediaz.map((img, index) => {
              if (index === dragIndex) {
                return targetImage;
              }
              if (index === hoverIndex) {
                return dragImage;
              }
              return img;
            });
        
            setFieldsValue({
              [name]: newMedias,
            });

          };
        
          const handleDelete = (imgSrc) => {
            const filteredMedia = mediaz.filter((img) => img !== imgSrc);
        
            setFieldsValue({
              [name]: filteredMedia,
            });
          };

          return (
            <>
              <Row>
                <Card className="mb-24 full-width">
                  <div>{children}</div>                  
                  <span>Click or drop file onto grey area to upload file</span>
                  <div ref={dropRef} className="mt-8">
                    <MediaUploader
                      noCrop
                      multiple
                      onUploadFinish={handleUploadFinish}
                      container="inhouse"
                      prefix={stockNo}
                      showUploadList={false}
                    >
                      {mediaz.length === 0 ? (
                        <p>Click or drag file here</p>
                      ) : (
                        mediaz.map((img) => {
                          return (
                            <DraggableDiamondMedia
                              variantFieldName={name}
                              key={img}
                              src={img}
                              moveItem={handleMoveVariantImage}
                              findItem={findItem}
                              onDelete={handleDelete}
                            />
                          );
                        })
                      )}
                    </MediaUploader>
                  </div>
                </Card>
              </Row>
            </>
          );
        }}
      </Form.Item>
    </div>
  );

  /*
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
  */
};

export default MediaMultiInput;
