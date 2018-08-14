import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { setRepeat } from '../actionCreators';

export default class RepeatDatePicker extends Component {
  constructor(props) {
    super(props);
    this.datePickerState = {
      numberOfRepeat: 1,
      typeOfRange: 'weeks',
      daysPicked: []
    }
  };
  handlePickValue(event) {
    let value = event.target.value;
    if (value) {
      this.setState(() => {
        return this.datePickerState = {
          ...this.datePickerState,
          numberOfRepeat: value
        }
      })
    }
  };
  handlePickType(e) {
    let value = e.target.value;
    if(value) {
      this.setState(() => {
        return this.datePickerState = {
          ...this.datePickerState,
          typeOfRange: value
        }
      })
    }
  }
  handlePickDay(day) {
    let { daysPicked } = this.datePickerState;
    let newDayPicked;
    if (day) {
      this.setState(() => {
        if(daysPicked.find(d => d === day)) {
          newDayPicked = daysPicked.filter(d => d !== day);
        } else {
          newDayPicked = daysPicked.concat(day);
        }
        return this.datePickerState = {
          ...this.datePickerState,
          daysPicked: newDayPicked
        }
      })
    }
  };
  handleFormSubmit() {
    let { store } = this.context;
    let { taskId, showCustomRepeat } = this.props;
    let serializedRepeat = JSON.stringify(this.datePickerState);
    store.dispatch(setRepeat(taskId, serializedRepeat));
    showCustomRepeat(false);
  }
  render() {
    let { numberOfRepeat, typeOfRange, daysPicked } = this.datePickerState;
    return (
      <div className="repeat-date-picker-wrapper">
        <div className="repeat-date-picker">
          <p>Repeat every ...</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleFormSubmit();
          }}>
            <input
              className="picker-value"
              name='picValue'
              defaultValue={numberOfRepeat}
              onChange={(e) => this.handlePickValue(e)}
            />
            <select
              className="picker-type"
              name="picType"
              defaultValue="weeks"
              onChange={(e) => this.handlePickType(e)}
            >
              <option value="days">days</option>
              <option value="weeks">weeks</option>
              <option value="months">months</option>
              <option value="years">years</option>
            </select>
            <div className="days-picker">
              {
                typeOfRange === "weeks" &&
                ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
                  .map((day, i) => {
                    return (
                      <span
                        key={i}
                        className={
                          "repeat-day-label" +
                          (daysPicked.find(d => d === day) ? ' selected' : '')
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          this.handlePickDay(day);
                        }}
                      >
                        <span>{day}</span>
                      </span>
                    )
                  })
              }
            </div>
            <div className="btn-group">
              <button className="btn-default">Cancel</button>
              <button className="btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

RepeatDatePicker.contextTypes = {
  store: PropTypes.object
};