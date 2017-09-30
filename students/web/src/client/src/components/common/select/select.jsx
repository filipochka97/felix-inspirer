import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import cx from 'classnames';

import './select.pcss';

const Select = ({
  label,
  required,
  name,
  onChange,
  options,
}) => {
  const id = nanoid();

  const labelClass = cx({
    select__label: true,
    'select__label--required': required,
  });

  const inputClass = cx({
    select__input: true,
  });

  return (
    <div className="select">
      <label
        htmlFor={id}
        className={labelClass}
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        onChange={onChange}
        className={inputClass}
      >
        {options
          .map(option =>
            <option key={option} value={option}>{option}</option>)
        }
      </select>
    </div>
  );
};

Select.defaultProps = {
  label: '',
  required: false,
};

Select.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;
