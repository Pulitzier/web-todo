import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  setRemindMeDate,
  setDueDate,
  setRepeat
} from '../actionCreators';
import { getStringDate } from '../helpers';
import Calendar from 'rc-calendar';
import TimePicker from 'rc-time-picker';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';
import RepeatDatePicker from "./RepeatDatePicker";

export default class ChildTaskSettings extends Component {
  constructor(props) {
    super(props);
    this.childSettingsState = {
      openReminderWindow: false,
      openDueDateWindow: false,
      openRepeat: false,
      showCalendar: false,
      showDueCalendar: false,
      showRepeat: false
    }
  };

  openReminder(bool) {
    this.setState(() => {
      return this.childSettingsState = {
        ...this.childSettingsState,
        openReminderWindow: bool,
        openDueDateWindow: false,
        openRepeat: false
      }
    })
  };

  openDueDate(bool) {
    this.setState(() => {
      return this.childSettingsState = {
        ...this.childSettingsState,
        openReminderWindow: false,
        openDueDateWindow: bool,
        openRepeat: false
      }
    })
  };

  openRepeatWindow(bool) {
    this.setState(() => {
      return this.childSettingsState = {
        ...this.childSettingsState,
        openReminderWindow: false,
        openDueDateWindow: false,
        openRepeat: bool,
      }
    })
  };

  showCustomCalendar(bool) {
    this.setState(() => {
      return this.childSettingsState = {
        ...this.childSettingsState,
        openReminderWindow: false,
        showCalendar: bool,
      }
    })
  };

  showDueDateCalendar(bool) {
    this.setState(() => {
      return this.childSettingsState = {
        ...this.childSettingsState,
        openDueDateWindow: false,
        showDueCalendar: bool,
      }
    })
  }

  showCustomRepeat(bool) {
    this.setState(() => {
      return this.childSettingsState = {
        ...this.childSettingsState,
        openRepeat: false,
        showRepeat: bool
      }
    })
  }

  render() {
    const { store } = this.context;
    const { activeTask: { id, remindDate, dueDate, repeat } } = this.props;
    let {
      openReminderWindow,
      showCalendar,
      showDueCalendar,
      openDueDateWindow,
      openRepeat,
      showRepeat
    } = this.childSettingsState;

    const getLaterTodayDate = () => {
      let today = new Date();
      return today.setHours(18, 0, 0);
    };
    const setLaterTodayDate = () => {
      store.dispatch(setRemindMeDate(id, getLaterTodayDate()));
      this.openReminder(false);
    };
    const getTomorrowDate = () => {
      let today = new Date();
      return (new Date(today.setDate(today.getDate() + 1))).setHours(9, 0, 0);
    };
    const setTomorrowDate = () => {
      store.dispatch(setRemindMeDate(id, getTomorrowDate()));
      this.openReminder(false);
    };
    const getNextWeekDate = () => {
      let today = new Date();
      today.setHours(9, 0, 0);
      today.setDate(today.getDate() + 7);
      return today;
    };
    const setNextWeekDate = () => {
      store.dispatch(setRemindMeDate(id, getNextWeekDate()));
      this.openReminder(false);
    };
    const selectCustomDate = (date) => {
      store.dispatch(setRemindMeDate(id, Date.parse(date.format())));
      this.showCustomCalendar(false);
    };
    const clearReminderDate = () => {
      store.dispatch(setRemindMeDate(id, ''));
    };

    const setDueTodayDate = () => {
      let dueToday = new Date();
      store.dispatch(setDueDate(id, (new Date(dueToday.setHours(23, 0, 0)))));
      this.openDueDate(false);
    };
    const setDueTomorrow = () => {
      store.dispatch(setDueDate(id, getTomorrowDate()));
      this.openDueDate(false);
    };
    const setDueNextWeek = () => {
      store.dispatch(setDueDate(id, getNextWeekDate()));
      this.openDueDate(false);
    };
    const selectCustomDueDate = (date) => {
      store.dispatch(setDueDate(id, Date.parse(date.format())));
      this.showDueDateCalendar(false);
    };
    const clearDueDate = () => {
      store.dispatch(setDueDate(id, ''));
      store.dispatch(setRepeat(id, ''));
    };

    const setRepeatType = (type) => {
      setDueTomorrow();
      store.dispatch(setRepeat(id, type));
      this.openRepeatWindow(false);
    };
    const clearRepeat = () => {
      store.dispatch(setRepeat(id, ''))
    };

    return (
      <div className="task-settings-additional">
        <ul>
          <li className={"remind-me " + (remindDate && 'reminded')}>
            <div onClick={() => this.openReminder(true)}>
              <img src="./assets/clock.svg" />
              <p>
                Remind me
                {
                  remindDate &&
                  (<span className="date-label">
                    {getStringDate(remindDate)}
                    </span>)
                }
              </p>
              {
                remindDate &&
                (<span
                  className="clear-remind-date"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearReminderDate();
                  }}
                >x</span>)
              }
            </div>
            {
              openReminderWindow && <div className="reminder-window">
                <ul>
                  <li onClick={() => setLaterTodayDate()}>
                    <img src="./assets/clock.svg" />
                    <p>Later Today</p>
                    <span>{(() => {
                      let time = getLaterTodayDate();
                      return getStringDate(time, {hour: 'numeric'});
                    })()}</span>
                  </li>
                  <li onClick={() => setTomorrowDate()}>
                    <img src="./assets/right.svg" />
                    <p>Tomorrow</p>
                    <span>{(() => {
                        let time = getTomorrowDate();
                        return getStringDate(time);
                      })()}</span>
                  </li>
                  <li onClick={() => setNextWeekDate()}>
                    <img src="./assets/play.svg" />
                    <p>Next Week</p>
                    <span>{(() => {
                      let time = getNextWeekDate();
                      return getStringDate(time);
                    })()}</span>
                  </li>
                  <li onClick={() => this.showCustomCalendar(true)}>
                    <img src="./assets/calendar.svg" />
                    <p>Pick a date & time</p>
                  </li>
                </ul>
              </div>
            }
            {
              showCalendar &&
              <Calendar
                className="pick-date-calendar"
                showDateInput={false}
                showOk={true}
                timePicker={<TimePicker />}
                onSelect={selectCustomDate}
              />
            }
          </li>
          <li className="due-date">
            <div onClick={() => this.openDueDate(true)}>
              <img src="./assets/calendar.svg" />
              <p>{(() => {
                let today = new Date();
                if(today.setHours(0,0,0,0) === new Date(dueDate).setHours(0,0,0,0)) {
                  return 'Due Today';
                } else if (today.setHours(24,0,0,0) === (new Date(dueDate)).setHours(0,0,0,0)) {
                  return 'Due Tomorrow';
                } else if (getNextWeekDate().setHours(0, 0, 0, 0) === (new Date(dueDate)).setHours(0, 0, 0, 0)) {
                  return `Due ${getStringDate((new Date(dueDate)))}`;
                };
                return 'Add due date'
              })()}</p>
              {
                dueDate &&
                (<span
                  className="clear-due-date"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearDueDate();
                  }}
                >x</span>)
              }
            </div>
            {
              openDueDateWindow && <div className="reminder-window">
                <ul>
                  <li onClick={() => setDueTodayDate()}>
                    <img src="./assets/clock.svg" />
                    <p>Today</p>
                    <span>{getStringDate((new Date()), {weekday: 'short'})}</span>
                  </li>
                  <li onClick={() => setDueTomorrow()}>
                    <img src="./assets/right.svg" />
                    <p>Tomorrow</p>
                    <span>{(() => {
                      let time = getTomorrowDate();
                      return getStringDate(time, {weekday: 'short'});
                    })()}</span>
                  </li>
                  <li onClick={() => setDueNextWeek()}>
                    <img src="./assets/play.svg" />
                    <p>Next Week</p>
                    <span>{(() => {
                      let time = getNextWeekDate();
                      return getStringDate(time, {weekday: 'short'});
                    })()}</span>
                  </li>
                  <li onClick={() => this.showDueDateCalendar(true)}>
                    <img src="./assets/calendar.svg" />
                    <p>Pick a date</p>
                  </li>
                </ul>
              </div>
            }
            {
              showDueCalendar &&
              <Calendar
                className="due-date-calendar"
                showDateInput={false}
                showOk={true}
                timePicker={<TimePicker />}
                onSelect={selectCustomDueDate}
                onPanelChange={() => console.log('changed')}
              />
            }
          </li>
          <li className="repeat">
            <div onClick={() => this.openRepeatWindow(true)}>
              <img src="./assets/repeat.svg" />
              <p>{(() => {

                return 'Repeat'
              })()}</p>
              {
                repeat &&
                (<span
                  className="clear-repeat"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearRepeat();
                  }}
                >x</span>)
              }
            </div>
            {
              openRepeat && <div className="repeat-window">
                <ul>
                  <li onClick={() => setRepeatType('daily')}>
                    <img src="./assets/matrix.svg" />
                    <p>Daily</p>
                  </li>
                  <li onClick={() => setRepeatType('weekdays')}>
                    <img src="./assets/dots.svg" />
                    <p>Weekdays</p>
                  </li>
                  <li onClick={() => setRepeatType('weekly')}>
                    <img src="./assets/circular.svg" />
                    <p>Weekly</p>
                  </li>
                  <li onClick={() => setRepeatType('monthly')}>
                    <img src="./assets/dots.svg" />
                    <p>Monthly</p>
                  </li>
                  <li onClick={() => this.showCustomRepeat(true)}>
                    <img src="./assets/rhombs.svg" />
                    <p>Custom</p>
                  </li>
                </ul>
              </div>
            }
            {
              showRepeat &&
              <RepeatDatePicker taskId={id} showCustomRepeat={(bool) => this.showCustomRepeat(bool)}/>
            }
          </li>
        </ul>
      </div>
    )
  };
}

ChildTaskSettings.contextTypes = {
  store: PropTypes.object,
};