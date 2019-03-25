import Template from './Template';
import { getActiveTodoList } from '../../../helpers';

export default class MyDayCategory extends Template {
  constructor(categories, task) {
    super();
    this.shouldBeRendered = this.shouldBeRendered.bind(this);
    this.myDayTask = task.myDay;
    this.activeTodoId = getActiveTodoList(categories).id;
    this.setText("My Day");
    this.setIconSrc("far fa-sun");
  }


  shouldBeRendered() {
    return (this.activeTodoId === 0) ? false : !!this.myDayTask;
  }
}