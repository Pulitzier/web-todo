import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  setRemindMeDate,
  setDueDate,
  setRepeat,
  updateTimestamp,
  shouldShowGreetings,
} from '../store/actions/index';
import { DATE_OPTIONS } from '../store/constants/index';
import { getStringDate } from '../helpers';
import RepeatDatePicker from './RepeatDatePicker';
import CustomDayPicker from './CustomDayPicker';

export default class ChildTaskSettings extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.shouldShowGreetingsPopup = this.shouldShowGreetingsPopup.bind(this);
    this.showCustomCalendar = this.showCustomCalendar.bind(this);
    this.openRepeatWindow = this.openRepeatWindow.bind(this);
    this.openDueDate = this.openDueDate.bind(this);
    this.openReminder = this.openReminder.bind(this);
    this.getTomorrowDate = this.getTomorrowDate.bind(this);
    this.setLaterTodayDate = this.setLaterTodayDate.bind(this);
    this.getLaterTodayDate = this.getLaterTodayDate.bind(this);
    this.showCustomRepeat = this.showCustomRepeat.bind(this);
    this.showDueDateCalendar = this.showDueDateCalendar.bind(this);
    this.setTomorrowDate = this.setTomorrowDate.bind(this);
    this.getNextWeekDate = this.getNextWeekDate.bind(this);
    this.setNextWeekDate = this.setNextWeekDate.bind(this);
    this.selectCustomDate = this.selectCustomDate.bind(this);
    this.selectCustomDueDate = this.selectCustomDueDate.bind(this);
    this.setDueNextWeek = this.setDueNextWeek.bind(this);
    this.setDueTomorrow = this.setDueTomorrow.bind(this);
    this.setDueTodayDate = this.setDueTodayDate.bind(this);
    this.clearReminderDate = this.clearReminderDate.bind(this);
    this.clearRepeat = this.clearRepeat.bind(this);
    this.setRepeatType = this.setRepeatType.bind(this);
    this.clearDueDate = this.clearDueDate.bind(this);
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

  shouldShowGreetingsPopup() {
    const { store } = this.context;
    const { taskSettings: { greetingTimestamp, showGreetingPopup } } = store.getState();
    if (new Date().toDateString() !== new Date(greetingTimestamp).toDateString()) {
      store.dispatch(updateTimestamp(Date.now()));
      if (!showGreetingPopup) store.dispatch(shouldShowGreetings(true));
    }
  }

  getLaterTodayDate() {
    const today = new Date();
    return today.setHours(18, 0, 0);
  }

  setLaterTodayDate(id) {
    const { store } = this.context;
    store.dispatch(setRemindMeDate(id, this.getLaterTodayDate()));
    this.openReminder(false);
  }

  getTomorrowDate() {
    const today = new Date();
    return (new Date(today.setDate(today.getDate() + 1))).setHours(9, 0, 0);
  }

  setTomorrowDate(id) {
    const { store } = this.context;
    store.dispatch(setRemindMeDate(id, this.getTomorrowDate()));
    this.openReminder(false);
  }

  getNextWeekDate() {
    const today = new Date();
    today.setHours(9, 0, 0);
    today.setDate(today.getDate() + 7);
    return today;
  }

  setNextWeekDate(id) {
    const { store } = this.context;
    store.dispatch(setRemindMeDate(id, this.getNextWeekDate()));
    this.openReminder(false);
  }

  selectCustomDate(id, date) {
    const { store } = this.context;
    store.dispatch(setRemindMeDate(id, date.getTime()));
    this.showCustomCalendar(false);
  }

  clearReminderDate(id) {
    const { store } = this.context;
    store.dispatch(setRemindMeDate(id, ''));
  }

  setDueTodayDate(id) {
    const { store } = this.context;
    const dueToday = new Date();
    store.dispatch(setDueDate(id, (new Date(dueToday.setHours(23, 0, 0)))));
    this.shouldShowGreetingsPopup();
    this.openDueDate(false);
  }

  setDueTomorrow(id) {
    const { store } = this.context;
    store.dispatch(setDueDate(id, this.getTomorrowDate()));
    this.shouldShowGreetingsPopup();
    this.openDueDate(false);
  }

  setDueNextWeek(id) {
    const { store } = this.context;
    store.dispatch(setDueDate(id, this.getNextWeekDate()));
    this.shouldShowGreetingsPopup();
    this.openDueDate(false);
  }

  selectCustomDueDate(id, date) {
    const { store } = this.context;
    store.dispatch(setDueDate(id, date.getTime()));
    this.shouldShowGreetingsPopup();
    this.showDueDateCalendar(false);
  }

  clearDueDate(id) {
    const { store } = this.context;
    store.dispatch(setDueDate(id, ''));
    store.dispatch(setRepeat(id, ''));
  }

  setRepeatType(id, type) {
    const { store } = this.context;
    this.setDueTomorrow(id);
    store.dispatch(setRepeat(id, type));
    this.openRepeatWindow(false);
  }

  clearRepeat(id) {
    const { store } = this.context;
    store.dispatch(setRepeat(id, ''));
  }

  render() {
    const {
      activeTask: {
        id: activeTaskId, remindDate, dueDate, repeat,
      },
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
        ref={node => this.additionalSet = node}
      >
        <ul>
          <li className={`remind-me${remindDate && ' activeOption'}`}>
            <div onClick={() => this.openReminder(true)}>
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
                  className="clear-remind-date"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.clearReminderDate(activeTaskId);
                  }}
                >
                  <i className="fas fa-times" />
                </span>
                )
              }
            </div>
            {
              openReminderWindow && (
              <div className="reminder-window">
                <ul>
                  <li onClick={() => this.setLaterTodayDate(activeTaskId)}>
                    <i className="far fa-clock" />
                    <p>Later Today</p>
                    <span>
                      {(() => {
                        const time = this.getLaterTodayDate();
                        return getStringDate(time, { hour: 'numeric' });
                      })()}
                    </span>
                  </li>
                  <li onClick={() => this.setTomorrowDate(activeTaskId)}>
                    <i className="far fa-arrow-alt-circle-right" />
                    <p>Tomorrow</p>
                    <span>
                      {(() => {
                        const time = this.getTomorrowDate();
                        return getStringDate(time);
                      })()}
                    </span>
                  </li>
                  <li onClick={() => this.setNextWeekDate(activeTaskId)}>
                    <i className="fas fa-angle-double-right" />
                    <p>Next Week</p>
                    <span>
                      {(() => {
                        const time = this.getNextWeekDate();
                        return getStringDate(time);
                      })()}
                    </span>
                  </li>
                  <li onClick={() => this.showCustomCalendar(true)}>
                    <i className="fas fa-calculator" />
                    <p>Pick a date & time</p>
                  </li>
                </ul>
              </div>
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
          </li>
          <li className={`due-date${dueDate && ' activeOption'}`}>
            <div onClick={() => this.openDueDate(true)}>
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
                  className="clear-due-date"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.clearDueDate(activeTaskId);
                  }}
                >
                  <i className="fas fa-times" />
                </span>
                )
              }
            </div>
            {
              openDueDateWindow && (
              <div className="reminder-window">
                <ul>
                  <li onClick={() => this.setDueTodayDate(activeTaskId)}>
                    <i className="far fa-clock" />
                    <p>Today</p>
                    <span>{getStringDate((new Date()), { weekday: 'short' })}</span>
                  </li>
                  <li onClick={() => this.setDueTomorrow(activeTaskId)}>
                    <i className="far fa-arrow-alt-circle-right" />
                    <p>Tomorrow</p>
                    <span>
                      {(() => {
                        const time = this.getTomorrowDate();
                        return getStringDate(time, { weekday: 'short' });
                      })()}
                    </span>
                  </li>
                  <li onClick={() => this.setDueNextWeek(activeTaskId)}>
                    <i className="fas fa-angle-double-right" />
                    <p>Next Week</p>
                    <span>
                      {(() => {
                        const time = this.getNextWeekDate();
                        return getStringDate(time, { weekday: 'short' });
                      })()}
                    </span>
                  </li>
                  <li onClick={() => this.showDueDateCalendar(true)}>
                    <i className="fas fa-calculator" />
                    <p>Pick a date</p>
                  </li>
                </ul>
              </div>
              )
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
          </li>
          <li className={`repeat${repeat && ' activeOption'}`}>
            <div onClick={() => this.openRepeatWindow(true)}>
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
                  className="clear-repeat"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.clearRepeat(activeTaskId);
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
                  <li onClick={() => this.setRepeatType(activeTaskId, 'daily')}>
                    <i className="fas fa-braille" />
                    <p>Daily</p>
                  </li>
                  <li onClick={() => this.setRepeatType(activeTaskId, 'weekdays')}>
                    <i className="fas fa-grip-horizontal" />
                    <p>Weekdays</p>
                  </li>
                  <li onClick={() => this.setRepeatType(activeTaskId, 'weekly')}>
                    <i className="fas fa-grip-vertical" />
                    <p>Weekly</p>
                  </li>
                  <li onClick={() => this.setRepeatType(activeTaskId, 'monthly')}>
                    <i className="fab fa-blackberry" />
                    <p>Monthly</p>
                  </li>
                  <li onClick={() => this.showCustomRepeat(true)}>
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

ChildTaskSettings.contextTypes = {
  store: PropTypes.object,
};
