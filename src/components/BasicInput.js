import React from 'react';

const BasicInput = (props) => {
  let {
    inputType,
    labelChangeClassCondition: { optionOne = '', optionTwo = '' },
    inputRef,
    inputActions: { onKeyPress = (() => {}), onChange = (() => {}), onFocus = (() => {})},
    children: baseClassChildren
  } = props;

  return (
    <div className={`add-new-${inputType}-wrapper`}>
      <label
        htmlFor={`toggle-${inputType}-checkbox-template`}
        className={
          `toggle-${inputType}-label-template` + ' ' +
          (optionOne ? 'active ' : 'inactive ') +
          (optionOne && optionTwo ? 'toggled' : 'untoggled')
        }
      >
        <span></span>
      </label>
      <input
        type="text"
        name={`add-new-${inputType}`}
        id={`toggle-${inputType}-checkbox-template`}
        placeholder={inputType === "task" ? `Add a ${inputType}` : `Next ${inputType}`}
        ref={inputRef}
        className={`add-new-${inputType}-input` + ' ' + (optionOne ? "activated" : "inactive")}
        onKeyPress={onKeyPress}
        onChange={onChange}
        onFocus={onFocus}
      />
      {baseClassChildren}
    </div>
  )
};

export default BasicInput;