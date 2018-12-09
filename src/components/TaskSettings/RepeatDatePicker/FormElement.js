import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import CheckboxGroup from './CheckboxGroup';
import { getActiveTask, getStringDate } from '../../../helpers';

const getRepeatDay = (date) => {
  if (typeof date === 'object' && date['repeatDay']) return date['repeatDay'];
  return [getStringDate((new Date()), { weekday: 'short' }).slice(0, 2)];
};

const mapStateToProps = (state) => {
  const { app: { tasks } } = state;
  const activeTask = getActiveTask(tasks);
  return {
    initialValues: {
      repeatValue: 1,
      repeatType: 'days',
      repeatDay: getRepeatDay(activeTask.repeat)
    }
  }
};

class FormElement extends Component {
  constructor(props) {
    super(props);
    this.handleChooseType = this.handleChooseType.bind(this),
    this.state = {
      repeatType: '',
    };
  }

  handleChooseType(event) {
    const { target: { value }} = event;
    if(value) this.setState({ repeatType: value })
  }

  render() {
    const { formReset, handleSubmit } = this.props;
    const { repeatType } = this.state;

    const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const repeatTypes = ['days', 'weeks', 'months', 'years'];

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
          {
            repeatTypes.map(type => {
              return <option key={type} value={type}>{type}</option>
            })
          }
        </Field>
        {
          repeatType === 'weeks'
          && (
            <div className="days-picker">
              <label
                htmlFor="repeatDay"
                className="repeat-day-label-wrapper"
              >
                <Field
                  name="repeatDay"
                  component={CheckboxGroup}
                  options={weekDays}
                />
              </label>
            </div>
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
