import { getStringDate } from '../../../helpers';
import React from 'react';
import BaseLabel from './BaseLabel'

export default class DueDateLabel extends BaseLabel {
  constructor(task) {
    super();
    this.task = task;
  }
  setLabel() {
    const { dueDate, repeat } = this.task;
    if (dueDate && repeat) {
      this.setRepeatIcon('fas fa-redo');
      return this.generateDueRepeatLabel(getStringDate(dueDate), 'far fa-calendar-alt');
    }
    if (dueDate) {
      return this.generateChildLabel(getStringDate(dueDate), 'far fa-calendar-alt');
    }
    if (repeat) return this.generateChildLabel('', 'fas fa-redo');
    return null;
  }
};
