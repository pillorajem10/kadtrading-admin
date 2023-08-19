import React, { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

// redux
import { useDispatch } from 'react-redux';
import { common } from '@redux/combineActions';

// constants
import { quillFormats, quillToolbarContainer } from '@constants';

// components
import DetailsSectionContainer from '@components/DetailsSectionContainer';
import { message, Form, Input } from 'antd';

const uploadFile = async (f, quill, dispatch) => {
  dispatch(common.ui.setLoading());
  const fmData = new FormData();
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };
  fmData.append('file', f);

  try {
    const res = await axios.post(
      '/common-api/files?container=merchant&prefix=cprof',
      fmData,
      config,
    );

    const { data, success, msg } = res.data;
    if (success) {
      dispatch(common.ui.clearLoading());
      const range = quill.getEditor().getSelection();
      const link = data;
      quill.getEditor().insertEmbed(range.index, 'image', link);
    } else {
      dispatch(common.ui.clearLoading());
      message.error(msg);
    }
  } catch (err) {
    dispatch(common.ui.clearLoading());
    message.error(err);
  }
};

const handleImage = (e, qRef, dispatch) => {
  const quill = qRef.current;
  const input = document.createElement('input');

  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  input.onchange = () => {
    const file = input.files[0];
    uploadFile(file, quill, dispatch);
  };
};

const MerchantCompanyProfileSection = ({ form, triggerCompare }) => {
  const dispatch = useDispatch();
  const quillRef = useRef();
  const { companyProfile } = form.getFieldsValue();
  const [value, setValue] = useState(companyProfile ?? '');

  const quillModule = useMemo(
    () => ({
      toolbar: {
        container: quillToolbarContainer,
        handlers: {
          image: (e) => handleImage(e, quillRef, dispatch),
        },
      },
      clipboard: { matchVisual: false },
    }),
    [dispatch],
  );

  const initialValue = useMemo(() => {
    return companyProfile;
  }, [companyProfile]);

  const handleChange = (evt) => {
    form.setFieldsValue({ companyProfile: evt });
    setValue(evt);
    triggerCompare();
  };

  return (
    <DetailsSectionContainer title="Step 3 - Company Profile">
      <Form.Item name="companyProfile" style={{ display: 'none' }}>
        <Input hidden />
      </Form.Item>

      <ReactQuill
        ref={quillRef}
        value={initialValue ?? value}
        onChange={handleChange}
        style={{ paddingBottom: 60, height: 300 }}
        modules={quillModule}
        formats={quillFormats}
        theme="snow"
      />
    </DetailsSectionContainer>
  );
};

export default MerchantCompanyProfileSection;
