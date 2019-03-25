import { getActiveTodoList } from '../../../helpers';
import Template from './Template';

export default class OtherCategories extends Template {
  static renderIconForLabel(prefix, iconSrc) {
    if (iconSrc !== 'fa-list') return `${prefix} ${iconSrc}`;
    return null;
  }

  constructor(categories, task) {
    super();
    this.shouldBeRendered = this.shouldBeRendered.bind(this);
    this.generateLabelData = this.generateLabelData.bind(this);
    this.taskParentId = task.parentId;
    this.todoIsParent = task.todoIsParent;
    this.activeTodoId = getActiveTodoList(categories).id;
    this.taskParent = categories.find(todo => todo.id === this.taskParentId);
    this.shouldBeRendered() && this.generateLabelData();
  }

  shouldBeRendered() {
    return !!(
      this.activeTodoId < 2
      || ( (this.taskParentId >= 3) && (this.taskParent.iconSource !== 'fa-list') )
    );
  }

  generateLabelData() {
    if (this.activeTodoId <= 1) {
      if (this.todoIsParent) {
        return this.setText("Tasks")
      } else {
        this.setText(this.taskParent.title);
        this.setIconSrc(OtherCategories.renderIconForLabel('fa', this.taskParent.iconSource));
        return;
      }
    }
    if ( (this.taskParentId >= 3) && (this.taskParent.iconSource !== 'fa-list') ) {
      this.setText(this.taskParent.title);
      this.setIconSrc(`fa ${this.taskParent.iconSource}`);
      return;
    }
    return undefined;
  }
}