import React from 'react';

export default class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.checkboxGroup = this.checkboxGroup.bind(this);
  }

  checkboxGroup() {
    const { options, input } = this.props;
    return options.map((option, index) => (
      <div
        key={index}
        className={"checkbox " + (input.value.indexOf(option) !== -1 ? 'checked' : '')}
      >
        <label className="repeat-day-label">
          <input
            type="checkbox"
            name={`${input.name}[${index}]`}
            value={option}
            checked={input.value.indexOf(option) !== -1}
            onChange={(event) => {
              const { target: { checked: inputChecked }} = event;
              const newValue = [...input.value];
              if (inputChecked) {
                newValue.push(option);
              } else {
                newValue.splice(newValue.indexOf(option), 1);
              }
              return input.onChange(newValue);
            }}
          />
          {option}
        </label>
      </div>
    ));
  }

  render() {
    return this.checkboxGroup();
  }
};
