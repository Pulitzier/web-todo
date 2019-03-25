import Template from './Template';

export default class Steps extends Template {
  constructor(steps, task) {
    super();
    this.shouldBeRendered = this.shouldBeRendered.bind(this);
    this.generateText = this.generateText.bind(this);
    this.parentTaskId = task.id;
    this.allTaskSteps = steps.filter(step => step.taskId === this.parentTaskId);
    this.shouldBeRendered() && this.setText(this.generateText());
  }

  generateText() {
    const doneSteps = this.allTaskSteps.filter(step => step.done);
    return `${doneSteps.length} of ${this.allTaskSteps.length}`;
  }

  shouldBeRendered() {
    return this.allTaskSteps.length !== 0;
  }
};
