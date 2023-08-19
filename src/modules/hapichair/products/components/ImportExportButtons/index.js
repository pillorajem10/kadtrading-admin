import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// antd
import { message, Modal, Space, Upload } from 'antd';

// antd icons
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

// redux
import { useDispatch } from 'react-redux';
import { common, hchair } from '@redux/combineActions';

import useDisclosure from '@hooks/useDisclosure';

const ImportExportButtons = ({ path }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOpen, toggleOpen } = useDisclosure();

  /*
  const generateDoc = () => {
    dispatch(hchair.products.exportProduct({}))
    .then(fileUrl => {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', 'Exported_Products.xlsx');
      document.body.appendChild(link);
      link.click();
    }).catch(() => {
      message.error('Export failed.');
    });
  };
  */
 
  const generateCsv = () => {
    dispatch(hchair.products.exportProduct({}))
    .then(fileUrl => {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', 'Exported_Inhouse.csv');
      document.body.appendChild(link);
      link.click();
    }).catch(() => {
      message.error('Export failed.');
    });
  };

  const uploadExcel = async options => {
    toggleOpen();
    dispatch(common.ui.setLoading());
    const { onSuccess, onError, file } = options;
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    fmData.append('file', file);

    try {
      const res = await axios.put(
        "/products/admin/product-uploads",
        fmData,
        config
      );

      if (res.data.success) {
        onSuccess("Ok");
        toggleOpen();
        dispatch(common.ui.clearLoading());
        message.success(`Product import successful.`);
        history.push(path);
      } else {
        toggleOpen();
        dispatch(common.ui.clearLoading());
        message.error(res.data.msg);
      }
    } catch (err) {
      toggleOpen();
      dispatch(common.ui.clearLoading());
      message.error(err);
      onError({ err });
    }
  };

  const uploadProps = {
    name: 'file',
    accept: '.xlsx',
    customRequest: uploadExcel,
    fileList: [],
  };

  return (
    <>
      <Modal
        closable={false}
        centered
        visible={isOpen}
        onCancel={() => toggleOpen()}
        width={486}
        header={null}
        footer={null}
      >
        <div style={{ textAlign: 'center' }}>Importing products..</div>
      </Modal>

      <Space direction="horizontal" size="middle">

        <span
          onClick={generateCsv}
          style={{ cursor: 'pointer'}}><UploadOutlined />&nbsp;Export</span>
        <Upload {...uploadProps}>
          <span style={{ cursor: 'pointer' }}><DownloadOutlined />&nbsp;Import</span>
        </Upload>        


      </Space>
    </>
  );
};

export default ImportExportButtons;
