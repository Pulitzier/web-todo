import BaseLabel from './BaseLabel';

export default class StepsLabel extends BaseLabel {
  constructor(steps, task) {
    super();
    this.steps = steps;
    this.task = task;
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
