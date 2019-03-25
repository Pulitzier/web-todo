import { getActiveTodoList } from '../../../helpers';
import Template from './Template';

export default class TasksCategory extends Template {
  constructor(categories, task) {
    super();
    this.shouldBeRendered = this.shouldBeRendered.bind(this);
    this.todoIsParent = task.todoIsParent;
    this.activeTodoId = getActiveTodoList(categories).id;
    this.setText("Tasks");
  }

  shouldBeRendered() {
    return (this.activeTodoId <= 1) && this.todoIsParent;
  }
}