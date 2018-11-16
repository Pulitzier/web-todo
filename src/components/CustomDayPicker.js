import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class CustomDayPicker extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    pickerClassName: PropTypes.string.isRequired,
    handleDateClick: PropTypes.func.isRequired,
    handleClosePicker: PropTypes.func,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick({ target }) {
    if (!this.customDayPicker.contains(target)) {
      this.props.handleClosePicker();
    }
  }

  render() {
    const { taskId, pickerClassName, handleDateClick } = this.props;
    return (
      <div
        ref={node => this.customDayPicker = node}
      >
        <DayPicker
          className={pickerClassName}
          onDayClick={date => handleDateClick(taskId, date)}
        />
      </div>
    );
  }
}
