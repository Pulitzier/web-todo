import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import {
  setRemindMeDate
} from '../actionCreators';
import { getStringDate } from '../helpers';
import Calendar from 'rc-calendar';
import TimePicker from 'rc-time-picker';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';

export default class ChildTaskSettings extends Component {
  constructor(props) {
    super(props);
    this.childSettingsState = {
      openReminderWindow: false,
      showCalendar: false,
    }
  };

  openReminder(bool) {
    this.setState(() => {
      return this.childSettingsState = {
        ...this.childSettingsState,
        openReminderWindow: bool,
      }
    })
  };

  showCustomCalendar() {
    this.setState(() => {
      return this.childSettingsState = {
        ...this.childSettingsState,
        openReminderWindow: false,
        showCalendar: true,
      }
    })
  };

  render() {
    const { store } = this.context;
    const { activeTask: { id, remindDate } } = this.props;
    let { openReminderWindow, showCalendar } = this.childSettingsState;
    let today = new Date();

    const getLaterTodayDate = () => {
      return today.setHours(18, 0, 0);
    };
    const setLaterTodayDate = () => {
      store.dispatch(setRemindMeDate(id, getLaterTodayDate()));
      this.openReminder(false);
    };

    const getTomorrowDate = () => {
      return (new Date(today.setDate(today.getDate() + 1))).setHours(9, 0, 0);
    };
    const setTomorrowDate = () => {
      store.dispatch(setRemindMeDate(id, getTomorrowDate()));
      this.openReminder(false);
    };

    const getNextWeekDate = () => {
      return (new Date(today.setDate(today.getDate() + 6))).setHours(9, 0, 0);
    };
    const setNextWeekDate = () => {
      store.dispatch(setRemindMeDate(id, getNextWeekDate));
      this.openReminder(false);
    };

    const selectCustomDate = (date) => {
      store.dispatch(setRemindMeDate(id, Date.parse(date.format())));
    };

    const clearReminderDate = () => {
      store.dispatch(setRemindMeDate(id, ''));
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
                  <li onClick={() => this.showCustomCalendar()}>
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
                showOk={false}
                timePicker={<TimePicker />}
                onSelect={selectCustomDate}
              />
            }
          </li>
          <li className="due-date">
            <img src="./assets/calendar.svg" />
            <p>Add due date</p>
          </li>
          <li className="repeat">
            <img src="./assets/repeat.svg" />
            <p>Repeat</p>
          </li>
        </ul>
      </div>
    )
  };
}

ChildTaskSettings.contextTypes = {
  store: PropTypes.object,
};