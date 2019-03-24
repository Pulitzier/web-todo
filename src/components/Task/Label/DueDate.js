import { getStringDate } from '../../../helpers';
import React from 'react';
import Template from './Template'

export default class DueDate extends Template {
  _repeatIcon = "";
  constructor(task) {
    super();
    this.task = task;
  }

  shouldBeRendered() {
    const { dueDate, repeat } = this.task;
    return !!(dueDate || repeat)
  }

  setRepeatIcon(src) {
    this._repeatIcon = src;
  }

  generateLabelData() {
    const { dueDate, repeat } = this.task;
    if (dueDate && repeat) {
      this.setIconSrc("far fa-calendar-alt");
      this.setText(getStringDate(dueDate));
      this.setRepeatIcon("fas fa-redo");
      return;
    }
    if (dueDate) {
      this.setIconSrc("far fa-calendar-alt");
      this.setText(getStringDate(dueDate));
      return;
    }
    if (repeat) {
      this.setIconSrc("fas fa-redo");
      return;
    }
    return undefined;
  }

  render() {
    this.shouldBeRendered() && this.generateLabelData();
    return (
      <p className="label-for-task">
        { this._iconSrc && <i className={this._iconSrc}/> }
        <span>{this._text}</span>
        <i className={this._repeatIcon} />
      </p>
    )
  }
};
