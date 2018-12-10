import React from 'react';
import PropTypes from 'react-proptypes';

const BasicInput = (props) => {
  const {
    inputType,
    labelClassName,
    iconClassName,
    inputRef,
    inputActions: { onKeyPress = (() => {}), onChange = (() => {}), onFocus = (() => {}) },
    children: baseClassChildren,
  } = props;

  return (
    <div className={`add-new-${inputType}-wrapper`}>
      <label
        htmlFor={`toggle-${inputType}-checkbox-template`}
        className={labelClassName}
      >
        <span />
      </label>
      <input
        type="text"
        name={`add-new-${inputType}`}
        id={`toggle-${inputType}-checkbox-template`}
        placeholder={inputType === 'task' ? `Add a ${inputType}` : `Next ${inputType}`}
        ref={inputRef}
        className={iconClassName}
        onKeyPress={onKeyPress}
        onChange={onChange}
        onFocus={onFocus}
      />
      {baseClassChildren}
    </div>
  );
};

BasicInput.propTypes = {
  inputType: PropTypes.string,
  labelClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  inputRef: PropTypes.func,
  inputActions: PropTypes.shape({}),
  children: PropTypes.any,
};

BasicInput.defaultProps = {
  inputType: '',
  labelClassName: '',
  iconClassName: '',
  inputRef: () => {},
  inputActions: {},
  children: '',
};

export default BasicInput;
