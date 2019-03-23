import { getActiveTodoList } from '../../../helpers';
import Template from './Template';

export default class Category extends Template {
  static renderIconForLabel(prefix, iconSrc) {
    if (iconSrc !== 'fa-list') return `${prefix} ${iconSrc}`;
    return null;
  }

  constructor(categories, task) {
    super();
    this.categories = categories;
    this.task = task;
    this.shouldBeRendered() && this.generateLabelData();
  }

  shouldBeRendered() {
    const { parentId, myDay } = this.task;
    const { id: activeTodoId } = getActiveTodoList(this.categories);
    const taskParent = this.categories.find(todo => todo.id === parentId);
    return !!(
      activeTodoId < 2
      || ( (parentId >= 3) && (taskParent.iconSource !== 'fa-list') )
      || ( (parentId >= 3) && myDay )
    );
  }

  generateLabelData() {
    const { parentId, myDay, todoIsParent } = this.task;
    const { id: activeTodoId } = getActiveTodoList(this.categories);
    const taskParent = this.categories.find(todo => todo.id === parentId);

    if (activeTodoId === 1) {
      if (todoIsParent && myDay) {
        this.setText("My Day • Tasks");
        this.setIconSrc("far fa-sun");
        return;
      } else {
        this.setText(taskParent.title);
        this.setIconSrc(Category.renderIconForLabel('fa', taskParent.iconSource));
        return;
      }
    }
    if ( (activeTodoId <= 1 ) && todoIsParent ) {
      return this.setText("Tasks");
    }
    if ( (parentId >= 3) && (taskParent.iconSource !== 'fa-list') ) {
      this.setText(taskParent.title);
      this.setIconSrc(`fa ${taskParent.iconSource}`);
      return;
    }
    if ( myDay ) {
      this.setText("My Day");
      this.setIconSrc("far fa-sun");
      return;
    }
    return undefined;
  }
}