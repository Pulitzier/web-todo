import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class CustomDayPicker extends Component {
  static propTypes = {
    taskId: PropTypes.number.isRequired,
    pickerClassName: PropTypes.string.isRequired,
    handleDateClick: PropTypes.func.isRequired,
    handleClosePicker: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick({ target }) {
    const { handleClosePicker } = this.props;
    if (!this.customDayPicker.contains(target)) {
      handleClosePicker();
    }
  }

  render() {
    const { taskId, pickerClassName, handleDateClick } = this.props;
    return (
      <div
        ref={(node) => { this.customDayPicker = node; }}
        className="custom-day-picker"
      >
        <DayPicker
          className={pickerClassName}
          onDayClick={date => handleDateClick(taskId, date)}
        />
      </div>
    );
  }
}
