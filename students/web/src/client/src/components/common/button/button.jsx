import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './button.styles.pcss';

const Button = ({
  children,
  success,
  primary,
  danger,
  warning,
  medium,
  large,
  fullwidth,
  click,
}) => {
  const btnClass = cx({
    btn: true,
    'btn--success': success,
    'btn--primary': primary,
    'btn--danger': danger,
    'btn--warning': warning,
    'btn--large': large,
    'btn--medium': medium,
    'btn--fullwidth': fullwidth,
  });
  return (
    <button className={btnClass} type="button" onClick={click}>
      { children }
    </button>
  );
};

Button.defaultProps = {
  success: false,
  primary: false,
  danger: false,
  warning: false,
  medium: false,
  large: false,
  fullwidth: false,
};

Button.propTypes = {
  success: PropTypes.bool,
  primary: PropTypes.bool,
  danger: PropTypes.bool,
  warning: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  fullwidth: PropTypes.bool,
  children: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
};

export default Button;
