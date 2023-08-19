import React, { useState } from 'react';

// antd
import { Button, Card, Col, Divider, Form, Input, InputNumber, message, Row, Select } from 'antd';

// react-color
import { PhotoshopPicker } from 'react-color';

// react-dnd
import { useDrop } from 'react-dnd';

// hooks
import useDisclosure from '@hooks/useDisclosure';

// const
import { colorGroupList } from '@constants';
import dndTypes from '@constants/dnd-types';

// components
import ColourGroupDropdown from '@components/ColourGroupDropdown';
import ColourPreview from '@components/ColourPreview';
import DraggableVariantImage from '@components/DraggableVariantImage';
import MediaUploader from '@components/MediaUploader';

// styling
import styles from './index.module.less';
import IconUpload from '../IconUpload';

const { Option } = Select;

const ProductVariantsInput = ({ field, onDuplicate, onRemove, getFieldValue, setFieldsValue }) => {
  const currentField = getFieldValue('variants')[field.name];
  const multiColorIcon = colorGroupList.find((c) => c.name === 'Multicolor')?.icon;
  const { color, images = [] } = currentField ?? { color: undefined, images: [] };
  const { isOpen, toggleOpen } = useDisclosure();
  const [tempColour, setTempColour] = useState(color);
  // dede
  const handleUploadFinish = (url) => {
    const variants = getFieldValue('variants');
    const thisField = variants[field.name];
    const newImages = [...thisField.images, url];

    const newVariants = variants.map((v, index) =>
      index === field.name ? { ...thisField, images: newImages } : v,
    );

    message.success('File uploaded');
    setFieldsValue({
      variants: newVariants,
    });
  };

  const handleDuplicateClick = () => {
    onDuplicate(field);
  };

  const handleColorChangeComplete = (selectedColour) => {
    const { rgb } = selectedColour;

    setTempColour(rgb);
  };

  const handleAcceptColorChange = () => {
    const variants = getFieldValue('variants');

    const { r, g, b, a } = tempColour;
    const colourCode = `${r},${g},${b},${a}`;

    const thisField = { ...variants[field.name], color: colourCode, icon: null };
    const newVariants = variants.map((v, index) => (index === field.name ? thisField : v));

    setFieldsValue({ variants: newVariants });
    toggleOpen();
  };

  const handleCancelColorChange = () => {
    setTempColour(color);
    toggleOpen();
  };

  const handleColourGroupChange = (colourGroupName) => {
    const colour = colorGroupList.find((cg) => cg.name === colourGroupName);
    const { code } = colour;

    if (!code) return;

    const regex = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
    const [, red, green, blue] = regex.exec(code);

    const colourCodeValue = {
      a: 1,
      r: parseInt(red, 10),
      g: parseInt(green, 10),
      b: parseInt(blue, 10),
    };

    setTempColour(colourCodeValue);

    const variants = getFieldValue('variants');

    const { r, g, b, a } = colourCodeValue;
    const colourCode = `${r},${g},${b},${a}`;
    const thisField = { ...variants[field.name], color: colourCode };
    const newVariants = variants.map((v, index) => (index === field.name ? thisField : v));

    setFieldsValue({ variants: newVariants });
  };

  const handleUploadIcon = (info) => {
    const { file } = info;

    if (file.status === 'done') {
      const {
        response: { data },
      } = file;

      const variants = getFieldValue('variants');

      const thisField = { ...variants[field.name], color: null, icon: data.url };
      const newVariants = variants.map((v, index) => (index === field.name ? thisField : v));
      setFieldsValue({ variants: newVariants });
    }
  };

  const findItem = (imgSrc) => {
    const image = images.filter((src) => `${src}` === imgSrc)[0];
    return {
      image,
      index: images.indexOf(image),
    };
  };

  const handleMoveVariantImage = (src, hoverIndex) => {
    const { image: dragImage, index: dragIndex } = findItem(src);
    const targetImage = images[hoverIndex];

    const newImages = images.map((img, index) => {
      if (index === dragIndex) {
        return targetImage;
      }
      if (index === hoverIndex) {
        return dragImage;
      }
      return img;
    });

    const variants = getFieldValue('variants');

    const thisField = { ...variants[field.name], images: newImages };
    const newVariants = variants.map((v, index) => (index === field.name ? thisField : v));

    setFieldsValue({
      variants: newVariants,
    });
  };

  const handleDelete = (imgSrc) => {
    const variants = getFieldValue('variants');

    const thisField = {
      ...variants[field.name],
      images: variants[field.name].images.filter((img) => img !== imgSrc),
    };
    const newVariants = variants.map((v, index) => (index === field.name ? thisField : v));

    setFieldsValue({
      variants: newVariants,
    });
  };

  const variants = getFieldValue('variants');
  const { label, icon, colorGroup } = variants[field.name];

  const [, dropRef] = useDrop({
    accept: dndTypes.VARIANT_IMAGE,
    canDrop: (item) => {
      // disallow drop from one variant field to another variant field
      return item.variantFieldName === field.name;
    },
  });

  return (
    <div className={styles.container}>
      <Form.Item name="hero" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="images" hidden>
        <Input />
      </Form.Item>
      <Row gutter={8} align="middle">
        <Col span={7}>
          <Form.Item
            {...field}
            label="Label"
            name={[field.name, 'name']}
            fieldKey={[field.fieldKey, 'name']}
          >
            <Input placeholder="Enter Label (e.g. colour)" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            {...field}
            label="Colour Group"
            name={[field.name, 'colorGroup']}
            fieldKey={[field.fieldKey, 'colorGroup']}
          >
            <ColourGroupDropdown onChange={handleColourGroupChange} />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            {...field}
            label="Type"
            name={[field.name, 'label']}
            fieldKey={[field.fieldKey, 'label']}
          >
            <Select placeholder="Select Type">
              <Option value="COLOR">Color</Option>
              <Option value="ICON">Icon</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={3}>
          <div className={styles.colorPickerContainer}>
            {label === 'COLOR' ? (
              <div style={{ position: 'relative' }}>
                {colorGroup === 'Multicolor' ? (
                  <IconUpload disabled icon={multiColorIcon} />
                ) : (
                  <ColourPreview colour={color ?? '#777'} onClick={toggleOpen} />
                )}
                {isOpen && (
                  <div className={styles.colorPicker}>
                    <PhotoshopPicker
                      color={tempColour ?? '#000'}
                      onChangeComplete={handleColorChangeComplete}
                      onCancel={handleCancelColorChange}
                      onAccept={handleAcceptColorChange}
                    />
                  </div>
                )}
              </div>
            ) : (
              <IconUpload onChange={handleUploadIcon} icon={icon} />
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Card className="mb-24 full-width">
          <span>Click or drop file onto grey area to upload file</span>
          <div ref={dropRef} className="mt-8">
            <MediaUploader
              noCrop
              multiple
              onUploadFinish={handleUploadFinish}
              container="product"
              prefix="pimg"
              showUploadList={false}
            >
              {images.length === 0 ? (
                <p>Click or drag file here</p>
              ) : (
                images.map((img) => {
                  return (
                    <DraggableVariantImage
                      variantFieldName={field.name}
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
      <Row gutter={8}>
        <Col span={7}>
          <Form.Item
            label="SKU"
            {...field}
            name={[field.name, 'sku']}
            fieldKey={[field.fieldKey, 'sku']}
          >
            <Input placeholder="Enter SKU" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="Price"
            {...field}
            name={[field.name, 'price']}
            fieldKey={[field.fieldKey, 'price']}
          >
            <InputNumber placeholder="$ + / -" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="Quantity"
            {...field}
            name={[field.name, 'qtyAvailable']}
            fieldKey={[field.fieldKey, 'qtyAvailable']}
          >
            <InputNumber placeholder="Enter Quantity" disabled />
          </Form.Item>
        </Col>
      </Row>
      <div className="align-right">
        <Button className="mr-8" type="danger" onClick={() => onRemove(field.name)}>
          Remove
        </Button>
        <Button onClick={handleDuplicateClick}>Duplicate</Button>
      </div>

      <Divider className={styles.divider} />
    </div>
  );
};

export default ProductVariantsInput;
