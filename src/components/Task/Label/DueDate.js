import { getStringDate } from '../../../helpers';
import React from 'react';
import Template from './Template'

export default class DueDate extends Template {
  _repeatIcon = "";
  constructor(task) {
    super();
    this.shouldBeRendered = this.shouldBeRendered.bind(this);
    this.setRepeatIcon = this.setRepeatIcon.bind(this);
    this.setLabelData = this.setLabelData.bind(this);
    this.dueDate = task.dueDate;
    this.repeatDate = task.repeat;
    this.dueDate && this.setLabelData();
    this.repeatDate && this.setRepeatIcon();
  }

  shouldBeRendered() {
    return !!(this.dueDate || this.repeatDate)
  }

  setRepeatIcon() {
    this._repeatIcon = "fas fa-redo";
  }

  setLabelData() {
    this.setIconSrc("far fa-calendar-alt");
    this.setText(getStringDate(this.dueDate));
  }

  render() {
    return (
      <p className="label-for-task">
        { this._iconSrc && <i className={this._iconSrc}/> }
        <span>{this._text}</span>
        <i className={this._repeatIcon} />
      </p>
    )
  }
};
