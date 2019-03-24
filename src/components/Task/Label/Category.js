import { getActiveTodoList } from '../../../helpers';
import Template from './Template';

export default class Category extends Template {
  static renderIconForLabel(prefix, iconSrc) {
    if (iconSrc !== 'fa-list') return `${prefix} ${iconSrc}`;
    return null;
  }

  constructor(categories, task) {
    super();
    this.shouldBeRendered = this.shouldBeRendered.bind(this);
    this.setLabelData = this.setLabelData.bind(this);
    this.generateLabelData = this.generateLabelData.bind(this);
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

  setLabelData(text, src) {
    this.setText(text);
    this.setIconSrc(src);
  }

  generateLabelData() {
    if (this.activeTodoId === 1) {
      if (this.todoIsParent && this.myDayTask) {
        return this.setLabelData("My Day • Tasks", "far fa-sun");
      } else {
        return this.setLabelData(
          this.taskParent.title,
          Category.renderIconForLabel('fa', this.taskParent.iconSource)
        );
      }
    }
    if ( (this.activeTodoId <= 1 )) {
      if (this.todoIsParent) {
        return this.setText("Tasks")
      } else {
        return this.setLabelData(
          this.taskParent.title,
          Category.renderIconForLabel('fa', this.taskParent.iconSource)
        );
      }
    }
    if ( (this.taskParentId >= 3) && (this.taskParent.iconSource !== 'fa-list') ) {
      return this.setLabelData(this.taskParent.title, `fa ${this.taskParent.iconSource}`);
    }
    if ( this.myDayTask ) {
      return this.setLabelData("My Day", "far fa-sun");
    }
    return undefined;
  }
}