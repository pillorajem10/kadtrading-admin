import { useCallback, useEffect, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { common } from '@redux/combineActions';

// lodash
import { isEmpty } from 'lodash';

// antd
import { Form } from 'antd';

// utils
import { difference, mapMomentValueToNumber, getRandomString } from '@utils/methods';

const compareFields = (source, target) => {
  const normalizedSource = mapMomentValueToNumber(source);
  const normalizedTarget = mapMomentValueToNumber(target);

  const diff = difference(normalizedTarget, normalizedSource);

  return { diff, hasDiff: !isEmpty(diff) };
};

const checkHasAnyError = (hasError, field) => (field?.errors?.length > 0 ? true : hasError);

const defaultFormState = {
  isDirty: false,
  isError: false,
};

/**
 *
 * @param {string} name
 * key to be used for dirty detection, must be unique
 *
 * @param {object} initialValues
 * form initial values
 *
 * @param {string[]} forceUpdateFields
 * form fields name to be updated once initialValues changes
 */
const useForm = ({ name, initialValues, forceUpdateFields = [] }) => {
  const [formName] = useState(name || getRandomString());

  const reduxFormState = useSelector((state) => state.form);
  const currentForm = reduxFormState[formName];

  const { isDirty, isError } = currentForm || defaultFormState;

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const setError = (value) => {
    // skip updating redux state if state remains the same
    if (value === isError) return;

    dispatch(
      common.form.updateForm({
        formName,
        isError: value,
      }),
    );
  };

  const onFieldsChange = () => {
    const currentFormValues = form.getFieldsValue();
    const fieldsError = form.getFieldsError() || [];
    const hasError = fieldsError.reduce(checkHasAnyError, false);

    if (hasError) {
      setError(true);
      return;
    }

    // reset error
    setError(false);

    const { hasDiff: newIsDirty } = compareFields(initialValues, currentFormValues);

    // skip updating redux state if state remains the same
    if (isDirty === newIsDirty) return;

    dispatch(
      common.form.updateForm({
        formName,
        isDirty: newIsDirty,
      }),
    );
  };

  const triggerCompare = useCallback(() => {
    const currentFormValues = form.getFieldsValue();
    const compareResult = compareFields(initialValues, currentFormValues);
    const { hasDiff } = compareResult;

    dispatch(
      common.form.updateForm({
        formName,
        isDirty: hasDiff,
      }),
    );
  }, [initialValues, form, dispatch, formName]);

  const resetDirty = () => {
    dispatch(
      common.form.updateForm({
        formName,
        isDirty: false,
      }),
    );
  };

  const onFormSave = async () => {
    try {
      const validateResult = await form.validateFields();

      const isSubmitNewForm = !initialValues?.id;

      if (validateResult) {
        dispatch(
          common.form.updateForm({
            formName,
            isNewForm: isSubmitNewForm,
          }),
        );
        form.submit();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (!initialValues) return;
    if (forceUpdateFields.length === 0) return;

    form.resetFields(forceUpdateFields);
    triggerCompare();

    /**
     * disable linting rules because
     * only want to listen to initialValues changes
     */
  }, [initialValues, triggerCompare, form]);

  const isEditForm = initialValues?.id;
  const canSubmitForm = isEditForm ? isDirty && !isError : true;

  const initializeFormCache = () => {
    if (!currentForm)
      dispatch(
        common.form.addForm({
          formName,
          isDirty: false,
        }),
      );
  };

  const removeFormCache = () => {
    dispatch(common.form.removeForm(formName));
  };

  useEffect(() => {
    initializeFormCache();

    return removeFormCache;
    /**
     * disable linting rules because
     * we only want to achieve did mount mechanic
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    form,
    onFieldsChange,
    triggerCompare,
    onFormSave,
    canSubmitForm,
    resetDirty,
  };
};

export default useForm;
