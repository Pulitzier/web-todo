import BaseLabel from './BaseLabel';

export default class NotesLabel extends BaseLabel {
  constructor(task) {
    super();
    this.task = task;
  }
  setLabel() {
    const { note } = this.task;
    if (note) return this.generateChildLabel('', 'far fa-sticky-note');
    return null;
  };
};
