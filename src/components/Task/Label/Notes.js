import Template from './Template';

export default class Notes extends Template {
  constructor(task) {
    super();
    this.taskNote = task.note;
    this.shouldBeRendered = this.shouldBeRendered.bind(this);
    this.setIconSrc('far fa-sticky-note');
  }

  shouldBeRendered() {
    return !!this.taskNote;
  }
};
