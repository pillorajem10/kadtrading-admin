import React from 'react';
import classnames from 'classnames';

// antd
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

// react-dnd
import { useDrag, useDrop } from 'react-dnd';

// constants
import dndTypes from '@constants/dnd-types';

// picture
import dibox from '@images/dibox.png';

// styling
import styles from './index.module.less';

const DraggableDiamondMedia = ({ src, variantFieldName, moveItem, findItem, onDelete }) => {
  const originalIndex = findItem(src).index;

  const [, drop] = useDrop({
    accept: dndTypes.INHOUSE_IMAGE,
    canDrop: () => false,
    hover({ src: draggedImgSrc }) {
      if (draggedImgSrc !== src) {
        const { index: overIndex } = findItem(src);
        moveItem(draggedImgSrc, overIndex);
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: dndTypes.INHOUSE_IMAGE, src, variantFieldName, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),

    end: (dropResult, monitor) => {
      const { src: imgSrc, originalIndex: ogIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveItem(imgSrc, ogIndex);
      }
    },
  });

  const handlePreviewClick = (event) => {
    event.stopPropagation();
    if (window) window.open(src);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDelete(src);
  };

  const onIconContainerClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const opacity = isDragging ? 0.2 : 1;
  const firstIconClass = classnames('mr-16', styles.icon);

  return (
    <div ref={(node) => drag(drop(node))} className={styles.container} style={{ opacity }}>
      <div style={{ position: 'relative' }}>
        <img src={variantFieldName === 'videos' ? dibox : src} alt="" className={styles.image} />
        <div className={styles.iconContainer} onClick={onIconContainerClick}>
          <EyeOutlined className={firstIconClass} onClick={handlePreviewClick} />
          <DeleteOutlined className={styles.dangerIcon} onClick={handleDeleteClick} />
        </div>
      </div>
    </div>
  );
};

export default DraggableDiamondMedia;
