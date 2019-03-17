import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { getActiveTask, getStringDate } from '../../../helpers';
import { REPEATTYPES, WEEKDAYS } from '../../../store/constants/index';

const getRepeatDay = (date) => {
  if (typeof date === 'object' && date['repeatDay']) return date['repeatDay'];
  return [getStringDate((new Date()), { weekday: 'short' }).slice(0, 2)];
};

const mapStateToProps = (state) => {
  const { app: { tasks } } = state;
  const activeTask = getActiveTask(tasks);
  if (typeof activeTask.repeat === 'object') return { initialValues: activeTask.repeat };
  return {
    initialValues: {
      repeatValue: 1,
      repeatType: 'days',
      repeatDays: getRepeatDay(activeTask.repeat)
    }
  }
};

class FormElement extends Component {
  constructor(props) {
    super(props);
    this.handleChooseType = this.handleChooseType.bind(this);
    const { initialValues: { repeatType: initialRepeatType }} = this.props;
    this.state = {
      repeatType: initialRepeatType,
    };
  }

  handleChooseType(event) {
    const { target: { value }} = event;
    if(value) this.setState({ repeatType: value })
  }

  render() {
    const { formReset, handleSubmit } = this.props;
    const { repeatType } = this.state;

    return (
      <form
        onSubmit={handleSubmit}
      >
        <Field
          name="repeatValue"
          type="text"
          component="input"
          className="picker-value"
        />
        <Field
          name="repeatType"
          component="select"
          className="picker-type"
          onChange={this.handleChooseType}
        >
          {REPEATTYPES.map(type => <option key={type} value={type}>{type}</option>)}
        </Field>
        {
          repeatType === 'weeks'
          && (
            <Field
              name="repeatDays"
              className="days-picker"
              component="select"
              multiple
              size={3}
            >
              {WEEKDAYS.map(day => <option key={day} value={day}>{day}</option>)}
            </Field>
          )
        }
        <div className="btn-group">
          <Button
            bsStyle="default"
            type="button"
            onClick={formReset}
          >Cancel</Button>
          <Button bsStyle="primary" type="submit">Save</Button>
        </div>
      </form>
    )
  }
};

export default connect(mapStateToProps, null)(
  reduxForm({ form: 'repeat' })(FormElement)
);
