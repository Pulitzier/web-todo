import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import FormElement from './FormElement';

export default class RepeatDatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnReset = this.handleOnReset.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick(event) {
    const { showCustomRepeat } = this.props;
    const { target } = event;
    if (!this.repeatDayPicker.contains(target)) {
      showCustomRepeat(false);
    }
  }

  handleOnSubmit(values) {
    const { handleFormSubmit } = this.props;
    handleFormSubmit(values);
  };

  handleOnReset(event) {
    event.preventDefault();
    event.stopPropagation();
    const { handleFormReset } = this.props;
    handleFormReset('');
  };

  render() {
    const { form } = this.props;
    return (
      <div className="repeat-date-picker-wrapper">
        <div
          className="repeat-date-picker"
          ref={(node) => { this.repeatDayPicker = node; }}
        >
          <p>Repeat every ...</p>
          <FormElement
            formState={form}
            onSubmit={this.handleOnSubmit}
            formReset={this.handleOnReset}
          />
        </div>
      </div>
    );
  }
}

RepeatDatePicker.propTypes = {
  showCustomRepeat: PropTypes.func,
  handleFormSubmit: PropTypes.func.isRequired,
  handleFormReset: PropTypes.func.isRequired,
};

RepeatDatePicker.defaultProps = {
  showCustomRepeat: () => {},
};
