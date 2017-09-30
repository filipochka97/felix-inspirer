import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import cx from 'classnames';

import './input.pcss';

const Input = ({
  label,
  required,
  type,
  name,
  click,
  defaultValue,
  accept,
}) => {
  const id = nanoid();

  const labelClass = cx({
    fieldset__label: true,
    'fieldset__label--file': type === 'file',
    'fieldset__label--required': required,
  });

  const inputClass = cx({
    fieldset__input: true,
    'fieldset__input--file': type === 'file',
  });

  const textareaClass = cx({
    fieldset__textarea: true,
  });

  return (
    <div className="fieldset">
      <label
        htmlFor={id}
        className={labelClass}
      >
        {label}
      </label>
      { type === 'textarea' &&
        <textarea
          id={id}
          name={name}
          onChange={click}
          className={textareaClass}
          defaultValue={defaultValue}
        />
      }
      { type !== 'textarea' &&
        <input
          id={id}
          name={name}
          type={type}
          onChange={click}
          className={inputClass}
          defaultValue={defaultValue}
          accept={accept}
        />
      }
    </div>
  );
};

Input.defaultProps = {
  label: '',
  type: 'text',
  required: false,
  defaultValue: '',
  accept: 'image/*',
};

Input.propTypes = {
  accept: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
  click: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
