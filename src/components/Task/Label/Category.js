import { getActiveTodoList } from '../../../helpers';
import Template from './Template';

export default class Category extends Template {
  static renderIconForLabel(prefix, iconSrc) {
    if (iconSrc !== 'fa-list') return `${prefix} ${iconSrc}`;
    return null;
  }

  constructor(categories, task) {
    super();
    this.taskParentId = task.parentId;
    this.myDayTask = task.myDay;
    this.todoIsParent = task.todoIsParent;
    this.activeTodoId = getActiveTodoList(categories).id;
    this.taskParent = categories.find(todo => todo.id === this.taskParentId);
    this.shouldBeRendered() && this.generateLabelData();
  }

  shouldBeRendered() {
    return !!(
      this.activeTodoId < 2
      || ( (this.taskParentId >= 3) && ( (this.taskParent.iconSource !== 'fa-list') || this.myDayTask ))
    );
  }

  generateLabelData() {
    if (this.activeTodoId === 1) {
      if (this.todoIsParent && this.myDayTask) {
        this.setText("My Day • Tasks");
        this.setIconSrc("far fa-sun");
        return;
      } else {
        this.setText(this.taskParent.title);
        this.setIconSrc(Category.renderIconForLabel('fa', this.taskParent.iconSource));
        return;
      }
    }
    if ( (this.activeTodoId <= 1 )) {
      if (this.todoIsParent) {
        return this.setText("Tasks")
      } else {
        this.setText(this.taskParent.title);
        this.setIconSrc(Category.renderIconForLabel('fa', this.taskParent.iconSource));
        return;
      }
    }
    if ( (this.taskParentId >= 3) && (this.taskParent.iconSource !== 'fa-list') ) {
      this.setText(this.taskParent.title);
      this.setIconSrc(`fa ${this.taskParent.iconSource}`);
      return;
    }
    if ( this.myDayTask ) {
      this.setText("My Day");
      this.setIconSrc("far fa-sun");
      return;
    }
    return undefined;
  }
}