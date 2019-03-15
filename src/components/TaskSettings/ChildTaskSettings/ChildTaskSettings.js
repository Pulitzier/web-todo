import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { DATE_OPTIONS } from '../../../store/constants/index';
import { getStringDate } from '../../../helpers';
import RepeatDatePicker from '../RepeatDatePicker/index';
import CustomDayPicker from '../CustomDayPicker';
import styled, { keyframes } from 'styled-components';
import { slideInDown } from 'react-animations';

const slideInDownAnimation = keyframes`${slideInDown}`;
const SlideOutDiv = styled.div`
  animation: .5s ${slideInDownAnimation};
`;

export default class ChildTaskSettings extends Component {
  static getLaterTodayDate() {
    const today = new Date();
    return today.setHours(18, 0, 0);
  }

  static getTomorrowDate() {
    const today = new Date();
    return (new Date(today.setDate(today.getDate() + 1))).setHours(9, 0, 0);
  }

  static getNextWeekDate() {
    const today = new Date();
    today.setHours(9, 0, 0);
    today.setDate(today.getDate() + 7);
    return today;
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.shouldShowGreetingsPopup = this.shouldShowGreetingsPopup.bind(this);
    this.showCustomCalendar = this.showCustomCalendar.bind(this);
    this.openRepeatWindow = this.openRepeatWindow.bind(this);
    this.openDueDate = this.openDueDate.bind(this);
    this.openReminder = this.openReminder.bind(this);
    this.setLaterTodayDate = this.setLaterTodayDate.bind(this);
    this.showCustomRepeat = this.showCustomRepeat.bind(this);
    this.showDueDateCalendar = this.showDueDateCalendar.bind(this);
    this.setTomorrowDate = this.setTomorrowDate.bind(this);
    this.setNextWeekDate = this.setNextWeekDate.bind(this);
    this.selectCustomDate = this.selectCustomDate.bind(this);
    this.selectCustomDueDate = this.selectCustomDueDate.bind(this);
    this.setDueNextWeek = this.setDueNextWeek.bind(this);
    this.setDueTomorrow = this.setDueTomorrow.bind(this);
    this.setDueTodayDate = this.setDueTodayDate.bind(this);
    this.setRepeatType = this.setRepeatType.bind(this);
    this.state = {
      openReminderWindow: false,
      openDueDateWindow: false,
      openRepeat: false,
      showCalendar: false,
      showDueCalendar: false,
      showRepeat: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  setRepeatType(type) {
    const { setRepeat } = this.props;
    this.setDueTomorrow();
    setRepeat(type);
    this.openRepeatWindow(false);
  }

  setLaterTodayDate() {
    const { setRemindMeDate } = this.props;
    setRemindMeDate(ChildTaskSettings.getLaterTodayDate());
    this.openReminder(false);
  }

  setTomorrowDate() {
    const { setRemindMeDate } = this.props;
    setRemindMeDate(ChildTaskSettings.getTomorrowDate());
    this.openReminder(false);
  }

  setNextWeekDate() {
    const { setRemindMeDate } = this.props;
    setRemindMeDate(ChildTaskSettings.getNextWeekDate());
    this.openReminder(false);
  }

  setDueTodayDate() {
    const { setDueDate } = this.props;
    const dueToday = new Date();
    setDueDate(new Date(dueToday.setHours(23, 0, 0)));
    this.shouldShowGreetingsPopup();
    this.openDueDate(false);
  }

  setDueTomorrow() {
    const { setDueDate } = this.props;
    setDueDate(ChildTaskSettings.getTomorrowDate());
    this.shouldShowGreetingsPopup();
    this.openDueDate(false);
  }

  setDueNextWeek() {
    const { setDueDate } = this.props;
    setDueDate(ChildTaskSettings.getNextWeekDate());
    this.shouldShowGreetingsPopup();
    this.openDueDate(false);
  }

  selectCustomDate(date) {
    const { setRemindMeDate } = this.props;
    setRemindMeDate(date.getTime());
    this.showCustomCalendar(false);
  }

  selectCustomDueDate(date) {
    const { setDueDate } = this.props;
    setDueDate(date.getTime());
    this.shouldShowGreetingsPopup();
    this.showDueDateCalendar(false);
  }

  shouldShowGreetingsPopup() {
    const {
      greetingTimestamp,
      showGreetingPopup,
      handleUpdateTimestamp,
      handleShowGreeting,
    } = this.props;
    if (new Date().toDateString() !== new Date(greetingTimestamp).toDateString()) {
      handleUpdateTimestamp(Date.now());
      if (!showGreetingPopup) handleShowGreeting();
    }
  }

  handleClick({ target }) {
    if (!this.additionalSet.contains(target)) {
      this.openDueDate(false);
      this.openReminder(false);
      this.openRepeatWindow(false);
    }
  }

  openReminder(bool) {
    this.setState({
      openReminderWindow: bool,
      openDueDateWindow: false,
      openRepeat: false,
    });
  }

  openDueDate(bool) {
    this.setState({
      openReminderWindow: false,
      openDueDateWindow: bool,
      openRepeat: false,
    });
  }

  openRepeatWindow(bool) {
    this.setState({
      openReminderWindow: false,
      openDueDateWindow: false,
      openRepeat: bool,
    });
  }

  showCustomCalendar(bool) {
    this.setState({
      openReminderWindow: false,
      showCalendar: bool,
    });
  }

  showDueDateCalendar(bool) {
    this.setState({
      openDueDateWindow: false,
      showDueCalendar: bool,
    });
  }

  showCustomRepeat(bool) {
    this.setState({
      openRepeat: false,
      showRepeat: bool,
    });
  }

  render() {
    const {
      activeTask: {
        id: activeTaskId, remindDate, dueDate, repeat,
      },
      clearDueDate,
      setRemindMeDate,
      setRepeat,
    } = this.props;
    const {
      openReminderWindow,
      showCalendar,
      showDueCalendar,
      openDueDateWindow,
      openRepeat,
      showRepeat,
    } = this.state;

    return (
      <div
        className="task-settings-additional"
        ref={(node) => { this.additionalSet = node; }}
      >
        <ul>
          <li className={`remind-me${remindDate && ' activeOption'}`}>
            <div role="presentation" onClick={() => this.openReminder(true)}>
              <i className="fas fa-stopwatch" />
              <p>
                Remind me
                {
                  remindDate
                  && (
                  <span>
                    {' '}
at
                    {(new Date(remindDate)).toLocaleString('en-us', { hour: 'numeric' })}
                  </span>
                  )
                }
                {
                  remindDate
                  && (
                  <span className="date-label">
                    {(new Date(remindDate)).toLocaleString('en-us', DATE_OPTIONS)}
                  </span>
                  )
                }
              </p>
              {
                remindDate
                && (
                <span
                  role="presentation"
                  className="clear-remind-date"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setRemindMeDate('');
                  }}
                >
                  <i className="fas fa-times" />
                </span>
                )
              }
            </div>
            <div className={`reminder-window ${(openReminderWindow || showCalendar) ? 'active' : ''}`}>
            {
              openReminderWindow && (
                <SlideOutDiv>
                  <ul>
                      <li role="presentation" onClick={() => this.setLaterTodayDate()}>
                        <i className="far fa-clock" />
                        <p>Later Today</p>
                        <span>
                      {(() => {
                        const time = ChildTaskSettings.getLaterTodayDate();
                        return getStringDate(time, { hour: 'numeric' });
                      })()}
                    </span>
                      </li>
                      <li role="presentation" onClick={() => this.setTomorrowDate()}>
                        <i className="far fa-arrow-alt-circle-right" />
                        <p>Tomorrow</p>
                        <span>
                      {(() => {
                        const time = ChildTaskSettings.getTomorrowDate();
                        return getStringDate(time);
                      })()}
                    </span>
                      </li>
                      <li role="presentation" onClick={() => this.setNextWeekDate()}>
                        <i className="fas fa-angle-double-right" />
                        <p>Next Week</p>
                        <span>
                      {(() => {
                        const time = ChildTaskSettings.getNextWeekDate();
                        return getStringDate(time);
                      })()}
                    </span>
                      </li>
                      <li role="presentation" onClick={() => this.showCustomCalendar(true)}>
                        <i className="fas fa-calculator" />
                        <p>Pick a date & time</p>
                      </li>
                    </ul>
                </SlideOutDiv>
              )
            }
            {
              showCalendar
              && (
                <CustomDayPicker
                  taskId={activeTaskId}
                  pickerClassName="pick-date-calendar"
                  handleDateClick={this.selectCustomDate}
                  handleClosePicker={() => this.showCustomCalendar(false)}
                />
              )
            }
            </div>
          </li>
          <li className={`due-date${dueDate && ' activeOption'}`}>
            <div role="presentation" onClick={() => this.openDueDate(true)}>
              <i className="far fa-minus-square" />
              <p>
                {(() => {
                  const today = new Date();
                  if (today.setHours(0, 0, 0, 0) === new Date(dueDate).setHours(0, 0, 0, 0)) {
                    return 'Due Today';
                  } if (today.setHours(24, 0, 0, 0) === (new Date(dueDate)).setHours(0, 0, 0, 0)) {
                    return 'Due Tomorrow';
                  } if (today.setHours(24, 0, 0, 0) < (new Date(dueDate)).setHours(0, 0, 0, 0)) {
                    return `Due ${(new Date(dueDate)).toLocaleString('en-us', DATE_OPTIONS)}`;
                  }
                  return 'Add due date';
                })()}
              </p>
              {
                dueDate
                && (
                <span
                  role="presentation"
                  className="clear-due-date"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearDueDate();
                  }}
                >
                  <i className="fas fa-times" />
                </span>
                )
              }
            </div>
            <div className={`reminder-window ${(openDueDateWindow || showDueCalendar) ? 'active' : '' }`}>
            {
              openDueDateWindow &&
                <SlideOutDiv>
                  <ul>
                    <li role="presentation" onClick={() => this.setDueTodayDate()}>
                      <i className="far fa-clock" />
                      <p>Today</p>
                      <span>{getStringDate((new Date()), { weekday: 'short' })}</span>
                    </li>
                    <li role="presentation" onClick={() => this.setDueTomorrow()}>
                      <i className="far fa-arrow-alt-circle-right" />
                      <p>Tomorrow</p>
                      <span>
                        {(() => {
                          const time = ChildTaskSettings.getTomorrowDate();
                          return getStringDate(time, { weekday: 'short' });
                        })()}
                      </span>
                    </li>
                    <li role="presentation" onClick={() => this.setDueNextWeek()}>
                      <i className="fas fa-angle-double-right" />
                      <p>Next Week</p>
                      <span>
                        {(() => {
                          const time = ChildTaskSettings.getNextWeekDate();
                          return getStringDate(time, { weekday: 'short' });
                        })()}
                      </span>
                    </li>
                    <li role="presentation" onClick={() => this.showDueDateCalendar(true)}>
                      <i className="fas fa-calculator" />
                      <p>Pick a date</p>
                    </li>
                  </ul>
                </SlideOutDiv>
              }
              {
                showDueCalendar
                && (
                <CustomDayPicker
                  taskId={activeTaskId}
                  pickerClassName="pick-date-calendar"
                  handleDateClick={this.selectCustomDueDate}
                  handleClosePicker={() => this.showDueDateCalendar(false)}
                />
                )
              }
              </div>
          </li>
          <li className={`repeat${repeat && ' activeOption'}`}>
            <div role="presentation" onClick={() => this.openRepeatWindow(true)}>
              <i className="fas fa-redo" />
              <p>
                {(() => {
                  switch (repeat) {
                    case 'daily':
                      return 'Daily';
                    case 'weekdays':
                      return (
                        <span>
Weekly
                          <span className="date-label">Weekdays</span>
                        </span>
                      );
                    case 'weekly':
                      return (
                        <span>
Weekly
                          <span className="date-label">Mon</span>
                        </span>
                      );
                    case 'monthly':
                      return 'Monthly';
                    default:
                      return 'Repeat';
                  }
                })()}
              </p>
              {
                repeat
                && (
                <span
                  role="presentation"
                  className="clear-repeat"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setRepeat('');
                  }}
                >
                  <i className="fas fa-times" />
                </span>
                )
              }
            </div>
            {
              openRepeat && (
              <div className="repeat-window">
                <ul>
                  <li role="presentation" onClick={() => this.setRepeatType('daily')}>
                    <i className="fas fa-braille" />
                    <p>Daily</p>
                  </li>
                  <li role="presentation" onClick={() => this.setRepeatType('weekdays')}>
                    <i className="fas fa-grip-horizontal" />
                    <p>Weekdays</p>
                  </li>
                  <li role="presentation" onClick={() => this.setRepeatType('weekly')}>
                    <i className="fas fa-grip-vertical" />
                    <p>Weekly</p>
                  </li>
                  <li role="presentation" onClick={() => this.setRepeatType('monthly')}>
                    <i className="fab fa-blackberry" />
                    <p>Monthly</p>
                  </li>
                  <li role="presentation" onClick={() => this.showCustomRepeat(true)}>
                    <i className="fas fa-chess-board" />
                    <p>Custom</p>
                  </li>
                </ul>
              </div>
              )
            }
            {
              showRepeat
              && (
              <RepeatDatePicker
                taskId={activeTaskId}
                updateDueDate={this.setDueTomorrow}
                showCustomRepeat={bool => this.showCustomRepeat(bool)}
              />
              )
            }
          </li>
        </ul>
      </div>
    );
  }
}

ChildTaskSettings.propTypes = {
  activeTask: PropTypes.shape({}),
  clearDueDate: PropTypes.func,
  setDueDate: PropTypes.func,
  setRemindMeDate: PropTypes.func,
  setRepeat: PropTypes.func,
  handleUpdateTimestamp: PropTypes.func,
  handleShowGreeting: PropTypes.func,
  showGreetingPopup: PropTypes.bool,
  greetingTimestamp: PropTypes.any,
};

ChildTaskSettings.defaultProps = {
  activeTask: {},
  clearDueDate: () => {},
  setDueDate: () => {},
  setRemindMeDate: () => {},
  setRepeat: () => {},
  handleShowGreeting: () => {},
  handleUpdateTimestamp: () => {},
  showGreetingPopup: false,
  greetingTimestamp: '',
};
