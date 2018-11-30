import React from 'react';
import PropTypes from 'react-proptypes';

const BasicPanel = ({ className, children, style }) => (
  <div
    className={className}
    style={style}
  >
    {children}
  </div>
);

BasicPanel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  style: PropTypes.shape({}),
};

BasicPanel.defaultProps = {
  className: '',
  style: {},
};

export default BasicPanel;
