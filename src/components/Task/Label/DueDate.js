import { getStringDate } from '../../../helpers';
import React from 'react';
import Template from './Template'

export default class DueDate extends Template {
  _repeatIcon = "";
  constructor(task) {
    super();
    this.shouldBeRendered = this.shouldBeRendered.bind(this);
    this.setRepeatIcon = this.setRepeatIcon.bind(this);
    this.generateLabelData = this.generateLabelData.bind(this);
    this.dueDate = task.dueDate;
    this.repeatDate = task.repeat;
  }

  shouldBeRendered() {
    return !!(this.dueDate || this.repeatDate)
  }

  setRepeatIcon(src) {
    this._repeatIcon = src;
  }

  generateLabelData() {
    if (this.dueDate && this.repeatDate) {
      this.setIconSrc("far fa-calendar-alt");
      this.setText(getStringDate(this.dueDate));
      this.setRepeatIcon("fas fa-redo");
      return;
    }
    if (this.dueDate) {
      this.setIconSrc("far fa-calendar-alt");
      this.setText(getStringDate(this.dueDate));
      return;
    }
    if (this.repeatDate) {
      this.setIconSrc("fas fa-redo");
      return;
    }
    return undefined;
  }

  render() {
    this.generateLabelData();
    return (
      <p className="label-for-task">
        { this._iconSrc && <i className={this._iconSrc}/> }
        <span>{this._text}</span>
        <i className={this._repeatIcon} />
      </p>
    )
  }
};
