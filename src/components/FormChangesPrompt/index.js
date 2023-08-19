import React from 'react';

// react-router-dom
import { Prompt } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

const FormChangesPrompt = () => {
  const form = useSelector((state) => state.form);

  const hasDirtyForm = Object.keys(form).reduce((dirtyForm, formKey) => {
    const { isDirty, isNewForm } = form[formKey] || { isDirty: false, isNewForm: false };

    if (isNewForm) return false;
    return isDirty ? true : dirtyForm;
  }, false);

  return (
    <Prompt when={hasDirtyForm} message="There are unsaved changes. Confirm discard changes?" />
  );
};

export default FormChangesPrompt;
