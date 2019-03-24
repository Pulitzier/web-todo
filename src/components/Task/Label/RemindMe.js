import Template from './Template';
import { getStringDate } from '../../../helpers';

export default class RemindMe extends Template {
  constructor(task) {
    super();
    this.shouldBeRendered = this.shouldBeRendered.bind(this);
    this.taskRemindDate = task.remindDate;
    this.setIconSrc("far fa-clock");
    this.shouldBeRendered() && this.setText(getStringDate(this.taskRemindDate));
  };

  shouldBeRendered() {
    return !!this.taskRemindDate;
  };
}