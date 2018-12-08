import { getActiveTodoList } from '../../../helpers';
import BaseLabel from './BaseLabel';

export default class CategoryLabel extends BaseLabel {
  static renderIconForLabel(iconSrc) {
    if (iconSrc !== 'fa-list') return iconSrc;
    return null;
  }

  constructor(categories, task) {
    super();
    this.categories = categories;
    this.task = task;
  }

  setLabel() {
    const { parentId, myDay, todoIsParent } = this.task;
    const { todoListId: activeTodoId } = getActiveTodoList(this.categories);
    const taskParent = this.categories.find(todo => todo.todoListId === parentId);

    if ( (activeTodoId === 1) && todoIsParent && myDay ) {
      return this.generateChildLabel("My Day • Tasks", "far fa-sun");
    }
    if ( (activeTodoId <= 1 ) && todoIsParent ) {
      return this.generateChildLabel("Tasks", "");
    }
    if ( parentId >= 3 ) {
      return this.generateChildLabel(
        taskParent.title,
        CategoryLabel.renderIconForLabel(taskParent.iconSource)
      );
    }
    if ( myDay ) {
      return this.generateChildLabel("My Day", "far fa-sun");
    }
    return null;
  }
}