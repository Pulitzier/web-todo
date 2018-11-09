import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { getStringDate } from '../helpers';
import { setRepeat } from '../actionCreators';

export default class RepeatDatePicker extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlePickDay = this.handlePickDay.bind(this);
    this.handlePickType = this.handlePickType.bind(this);
    this.handlePickValue = this.handlePickValue.bind(this);
    this.state = {
      numberOfRepeat: 1,
      typeOfRange: 'weeks',
      daysPicked: [getStringDate((new Date()), { weekday: 'short' }).slice(0, 2)],
    };
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

  handlePickValue(event) {
    const value = event.target.value;
    if (value) {
      this.setState({ numberOfRepeat: value });
    }
  }

  handlePickType(e) {
    const value = e.target.value;
    if (value) {
      this.setState({ typeOfRange: value });
    }
  }

  handlePickDay(day) {
    const { daysPicked } = this.state;
    let newDayPicked;
    if (day) {
      if (daysPicked.find(d => d === day)) {
        newDayPicked = daysPicked.filter(d => d !== day);
      } else {
        newDayPicked = daysPicked.concat(day);
      }
      this.setState({ daysPicked: newDayPicked });
    }
  }

  handleFormSubmit() {
    const { store } = this.context;
    const { taskId, showCustomRepeat, updateDueDate } = this.props;
    const serializedRepeat = JSON.stringify(this.state);
    store.dispatch(setRepeat(taskId, serializedRepeat));
    updateDueDate(taskId);
    showCustomRepeat(false);
  }

  handleFormReset() {
    const { store } = this.context;
    const { taskId, showCustomRepeat } = this.props;
    store.dispatch(setRepeat(taskId, ''));
    showCustomRepeat(false);
  }

  render() {
    const { numberOfRepeat, typeOfRange, daysPicked } = this.state;
    return (
      <div className="repeat-date-picker-wrapper">
        <div
          className="repeat-date-picker"
          ref={node => this.repeatDayPicker = node}
        >
          <p>Repeat every ...</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.handleFormSubmit();
            }}
            onReset={(e) => {
              e.preventDefault();
              e.stopPropagation();
              this.handleFormReset();
            }}
          >
            <input
              className="picker-value"
              name="picValue"
              defaultValue={numberOfRepeat}
              onChange={e => this.handlePickValue(e)}
            />
            <select
              className="picker-type"
              name="picType"
              defaultValue="weeks"
              onChange={e => this.handlePickType(e)}
            >
              <option value="days">days</option>
              <option value="weeks">weeks</option>
              <option value="months">months</option>
              <option value="years">years</option>
            </select>
            <div className="days-picker">
              {
                typeOfRange === 'weeks'
                && ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
                  .map((day, i) => (
                    <span
                      key={i}
                      className={
                          `repeat-day-label${
                            daysPicked.find(d => d === day) ? ' selected' : ''}`
                        }
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.handlePickDay(day);
                      }}
                    >
                      <span>{day}</span>
                    </span>
                  ))
              }
            </div>
            <div className="btn-group">
              <button className="btn-default" type="reset">Cancel</button>
              <button className="btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

RepeatDatePicker.contextTypes = {
  store: PropTypes.object,
};
