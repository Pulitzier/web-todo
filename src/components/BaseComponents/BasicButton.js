import React from 'react';
import PropTypes from 'react-proptypes';

const BasicButton = (props) => {
  const {
    buttonClassName,
    buttonOnClickAction,
    buttonText,
    iconClassName,
    buttonStyle,
    disabled,
  } = props;

  const renderButtonChild = (text) => {
    if (text) return <span>{text}</span>;
    return <i className={iconClassName} />;
  };

  return (
    <button
      type="button"
      className={buttonClassName}
      onClick={buttonOnClickAction}
      style={buttonStyle}
      disabled={disabled}
    >
      {renderButtonChild(buttonText)}
    </button>
  );
};

BasicButton.propTypes = {
  buttonClassName: PropTypes.string,
  buttonOnClickAction: PropTypes.func,
  buttonText: PropTypes.string,
  iconClassName: PropTypes.string,
  buttonStyle: PropTypes.shape({}),
  disabled: PropTypes.bool,
};

BasicButton.defaultProps = {
  buttonClassName: '',
  buttonOnClickAction: () => {},
  buttonText: '',
  iconClassName: '',
  buttonStyle: {},
  disabled: false,
};

export default BasicButton;
