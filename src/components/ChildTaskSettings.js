import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  setRemindMeDate,
  setDueDate,
  setRepeat,
  updateTimestamp,
  shouldShowGreetings
} from '../actionCreators';
import { getStringDate } from '../helpers';
import RepeatDatePicker from "./RepeatDatePicker";
import CustomDayPicker from "./CustomDayPicker";

export default class ChildTaskSettings extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.shouldShowGreetingsPopup = this.shouldShowGreetingsPopup.bind(this);
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
  };

  componentDidMount(){
    document.addEventListener('click', this.handleClick, false);
  };

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  };

  handleClick(event) {
    let { target } = event;
    if (!this.additionalSet.contains(target)) {
      this.openDueDate(false);
      this.openReminder(false);
      this.openRepeatWindow(false);
    }
  };

  shouldShowGreetingsPopup() {
    const { store } = this.context;
    let { taskSettings: { greetingTimestamp }} = store.getState();
    if(new Date().toDateString() !== new Date(greetingTimestamp).toDateString()) {
      store.dispatch(updateTimestamp(Date.now()));
      store.dispatch(shouldShowGreetings(true));
    }
  };

  render() {
    const { store } = this.context;
    const { activeTask: { id, remindDate, dueDate, repeat } } = this.props;
    const {
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
      store.dispatch(setRemindMeDate(id, date.getTime()));
      this.showCustomCalendar(false);
    };
    const clearReminderDate = () => {
      store.dispatch(setRemindMeDate(id, ''));
    };

    const setDueTodayDate = () => {
      let dueToday = new Date();
      store.dispatch(setDueDate(id, (new Date(dueToday.setHours(23, 0, 0)))));
      this.shouldShowGreetingsPopup();
      this.openDueDate(false);
    };
    const setDueTomorrow = () => {
      store.dispatch(setDueDate(id, getTomorrowDate()));
      this.shouldShowGreetingsPopup();
      this.openDueDate(false);
    };
    const setDueNextWeek = () => {
      store.dispatch(setDueDate(id, getNextWeekDate()));
      this.shouldShowGreetingsPopup();
      this.openDueDate(false);
    };
    const selectCustomDueDate = (date) => {
      store.dispatch(setDueDate(id, date.getTime()));
      this.shouldShowGreetingsPopup();
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
      <div
        className="task-settings-additional"
        ref={node => this.additionalSet = node}
      >
        <ul>
          <li className={"remind-me" + (remindDate && ' activeOption')}>
            <div onClick={() => this.openReminder(true)}>
              <i className="fas fa-stopwatch"></i>
              <p>
                Remind me
                {
                  remindDate &&
                  (<span> at {(new Date(remindDate)).toLocaleString('en-us', {hour: 'numeric'})}</span>)
                }
                {
                  remindDate &&
                  (<span className="date-label">
                    {(new Date(remindDate)).toLocaleString('en-us', {weekday: 'short', month: 'short', day: 'numeric'})}
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
                ><i className="fas fa-times"></i></span>)
              }
            </div>
            {
              openReminderWindow && <div className="reminder-window">
                <ul>
                  <li onClick={() => setLaterTodayDate()}>
                    <i className="far fa-clock"></i>
                    <p>Later Today</p>
                    <span>{(() => {
                      let time = getLaterTodayDate();
                      return getStringDate(time, {hour: 'numeric'});
                    })()}</span>
                  </li>
                  <li onClick={() => setTomorrowDate()}>
                    <i className="far fa-arrow-alt-circle-right"></i>
                    <p>Tomorrow</p>
                    <span>{(() => {
                        let time = getTomorrowDate();
                        return getStringDate(time);
                      })()}</span>
                  </li>
                  <li onClick={() => setNextWeekDate()}>
                    <i className="fas fa-angle-double-right"></i>
                    <p>Next Week</p>
                    <span>{(() => {
                      let time = getNextWeekDate();
                      return getStringDate(time);
                    })()}</span>
                  </li>
                  <li onClick={() => this.showCustomCalendar(true)}>
                    <i className="fas fa-calculator"></i>
                    <p>Pick a date & time</p>
                  </li>
                </ul>
              </div>
            }
            {
              showCalendar &&
                <CustomDayPicker
                  pickerClassName="pick-date-calendar"
                  handleDateClick={selectCustomDate}
                  handleClosePicker={() => this.showCustomCalendar(false)}
                />
            }
          </li>
          <li className={"due-date" + (dueDate && ' activeOption')}>
            <div onClick={() => this.openDueDate(true)}>
              <i className="far fa-minus-square"></i>
              <p>{(() => {
                let today = new Date();
                if(today.setHours(0,0,0,0) === new Date(dueDate).setHours(0,0,0,0)) {
                  return 'Due Today';
                } else if (today.setHours(24,0,0,0) === (new Date(dueDate)).setHours(0,0,0,0)) {
                  return 'Due Tomorrow';
                } else if (today.setHours(24,0,0,0) < (new Date(dueDate)).setHours(0,0,0,0)) {
                  return `Due ${(new Date(dueDate)).toLocaleString('en-us', {weekday: 'short', month: 'short', day: 'numeric'})}`;
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
                ><i className="fas fa-times"></i></span>)
              }
            </div>
            {
              openDueDateWindow && <div className="reminder-window">
                <ul>
                  <li onClick={() => setDueTodayDate()}>
                    <i className="far fa-clock"></i>
                    <p>Today</p>
                    <span>{getStringDate((new Date()), {weekday: 'short'})}</span>
                  </li>
                  <li onClick={() => setDueTomorrow()}>
                    <i className="far fa-arrow-alt-circle-right"></i>
                    <p>Tomorrow</p>
                    <span>{(() => {
                      let time = getTomorrowDate();
                      return getStringDate(time, {weekday: 'short'});
                    })()}</span>
                  </li>
                  <li onClick={() => setDueNextWeek()}>
                    <i className="fas fa-angle-double-right"></i>
                    <p>Next Week</p>
                    <span>{(() => {
                      let time = getNextWeekDate();
                      return getStringDate(time, {weekday: 'short'});
                    })()}</span>
                  </li>
                  <li onClick={() => this.showDueDateCalendar(true)}>
                    <i className="fas fa-calculator"></i>
                    <p>Pick a date</p>
                  </li>
                </ul>
              </div>
            }
            {
              showDueCalendar &&
              <CustomDayPicker
                pickerClassName="pick-date-calendar"
                handleDateClick={selectCustomDueDate}
                handleClosePicker={() => this.showDueDateCalendar(false)}
              />
            }
          </li>
          <li className={"repeat" + (repeat && ' activeOption')}>
            <div onClick={() => this.openRepeatWindow(true)}>
              <i className="fas fa-redo"></i>
              <p>{(() => {
                switch (repeat){
                  case 'daily':
                    return 'Daily';
                  case 'weekdays':
                    return (<span>Weekly<span className="date-label">Weekdays</span></span>);
                  case 'weekly':
                    return (<span>Weekly<span className="date-label">Mon</span></span>);
                  case 'monthly':
                    return 'Monthly';
                  default:
                    return 'Repeat'
                }
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
                ><i className="fas fa-times"></i></span>)
              }
            </div>
            {
              openRepeat && <div className="repeat-window">
                <ul>
                  <li onClick={() => setRepeatType('daily')}>
                    <i className="fas fa-braille"></i>
                    <p>Daily</p>
                  </li>
                  <li onClick={() => setRepeatType('weekdays')}>
                    <i className="fas fa-grip-horizontal"></i>
                    <p>Weekdays</p>
                  </li>
                  <li onClick={() => setRepeatType('weekly')}>
                    <i className="fas fa-grip-vertical"></i>
                    <p>Weekly</p>
                  </li>
                  <li onClick={() => setRepeatType('monthly')}>
                    <i className="fab fa-blackberry"></i>
                    <p>Monthly</p>
                  </li>
                  <li onClick={() => this.showCustomRepeat(true)}>
                    <i className="fas fa-chess-board"></i>
                    <p>Custom</p>
                  </li>
                </ul>
              </div>
            }
            {
              showRepeat &&
              <RepeatDatePicker
                taskId={id}
                updateDueDate={setDueTomorrow}
                showCustomRepeat={(bool) => this.showCustomRepeat(bool)}/>
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