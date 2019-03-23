import Template from './Template';
import { getStringDate } from '../../../helpers';

export default class RemindSubLabel extends Template {
  constructor(task) {
    super();
    this.taskRemindDate = task.remindDate;
    this.setText(getStringDate(this.taskRemindDate));
    this.setIconSrc("far fa-clock");
  };

  shouldBeRendered() {
    return !!this.taskRemindDate;
  };
}