import Template from './Template';

export default class Notes extends Template {
  constructor(task) {
    super();
    this.task = task;
    this.setIconSrc('far fa-sticky-note');
  }

  shouldBeRendered() {
    const { note } = this.task;
    return !!note;
  }
};
