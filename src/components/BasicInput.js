import React from 'react';

const BasicInput = (props) => {
  const {
    inputType,
    labelClassName,
    iconClassName,
    inputRef,
    inputActions: { onKeyPress = (() => {}), onChange = (() => {}), onFocus = (() => {})},
    children: baseClassChildren
  } = props;

  return (
    <div className={`add-new-${inputType}-wrapper`}>
      <label
        htmlFor={`toggle-${inputType}-checkbox-template`}
        className={labelClassName}
      >
        <span></span>
      </label>
      <input
        type="text"
        name={`add-new-${inputType}`}
        id={`toggle-${inputType}-checkbox-template`}
        placeholder={inputType === "task" ? `Add a ${inputType}` : `Next ${inputType}`}
        ref={inputRef}
        className={iconClassName}
        onKeyPress={onKeyPress}
        onChange={onChange}
        onFocus={onFocus}
      />
      {baseClassChildren}
    </div>
  )
};

export default BasicInput;