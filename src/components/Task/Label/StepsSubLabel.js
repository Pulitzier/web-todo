import Template from './Template';

export default class StepsSubLabel extends Template {
  constructor(steps, task) {
    super();
    this.parentTaskId = task.id;
    this.allTaskSteps = steps.filter(step => step.taskId === this.parentTaskId);
    this.setIconSrc("");
    this.setText(this.generateText());
  }

  generateText() {
    const doneSteps = this.allTaskSteps.filter(step => step.done);
    if (this.shouldBeRendered()) return `${doneSteps.length} of ${this.allTaskSteps.length}`;
    return '';
  }

  shouldBeRendered() {
    return !!(this.allTaskSteps.length !== 0);
  }

  setLabel() {
    const { parentId } = this.task;
    const allTaskSteps = this.steps.filter(step => step.taskId === parentId);
    const doneSteps = allTaskSteps.filter(step => step.done);

    if (allTaskSteps.length !== 0) {
      return this.generateChildLabel(`${doneSteps.length} of ${allTaskSteps.length}`, "");
    }
    return null;
  }
};
