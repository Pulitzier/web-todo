import BaseLabel from './BaseLabel';
import { getStringDate } from '../../../helpers';

export default class RemindLabel extends BaseLabel {
  constructor(task) {
    super();
    this.task = task;
  };
  setLabel() {
    const { remindDate } = this.task;
    if (remindDate) {
      return this.generateChildLabel(getStringDate(remindDate), 'far fa-clock');
    }
    return null;
  };
}