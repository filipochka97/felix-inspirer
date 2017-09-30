import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './fieldHint.pcss';

export const fieldHint = ({ children, isError }) => {
  const hintClass = cx({
    hint: true,
    'hint--error': isError,
  });
  return (
    <p className={hintClass}>
      {children || <br />}
    </p>
  );
};

fieldHint.defaultProps = {
  isError: false,
  children: '',
};

fieldHint.propTypes = {
  isError: PropTypes.bool,
  children: PropTypes.string,
};

export default fieldHint;
