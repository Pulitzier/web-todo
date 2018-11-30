import React from 'react';
import PropTypes from 'react-proptypes';

const BasicLabel = ({ labelClassName, labelOnClickAction, iconClassName }) => (
  <label
    className={labelClassName}
    onClick={labelOnClickAction}
  >
    <i className={iconClassName} />
  </label>
);

BasicLabel.propTypes = {
  labelClassName: PropTypes.string,
  labelOnClickAction: PropTypes.func,
  iconClassName: PropTypes.string,
};

BasicLabel.defaultProps = {
  labelClassName: '',
  labelOnClickAction: () => {},
  iconClassName: '',
};

export default BasicLabel;
