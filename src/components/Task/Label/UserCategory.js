import { getActiveTodoList } from '../../../helpers';
import Template from './Template';

export default class UserCategory extends Template {
  static renderIconForLabel(prefix, iconSrc) {
    if (iconSrc !== 'fa-list') return `${prefix} ${iconSrc}`;
    return "";
  }

  constructor(categories, task) {
    super();
    this.shouldBeRendered = this.shouldBeRendered.bind(this);
    this.activeTodoId = getActiveTodoList(categories).id;
    this.taskParent = categories.find(todo => todo.id === task.parentId);
    this.setText(this.taskParent.title);
    this.setIconSrc(UserCategory.renderIconForLabel('fa', this.taskParent.iconSource));
  }

  shouldBeRendered() {
    return (this.activeTodoId <= 1 && this.taskParent.id !== 0) || (this.taskParent.id > 2 && this.taskParent.iconSource !== 'fa-list');
  }
}