let stepUniqueId = 0;
export default function stepsReducer(state = [], action) {
  const stepId = stepUniqueId;
  switch (action.type) {
    case 'ADD_STEP_TO_TASK':
      stepUniqueId += 1;
      return [
        ...state,
        {
          stepId,
          taskId: action.taskId,
          done: false,
          stepText: action.stepText,
        },
      ];
    case 'TOGGLE_STEP':
      return state.map((step) => {
        if (step.stepId === action.stepId) {
          return {
            ...step,
            done: !step.done,
          };
        }
        return step;
      });
    case 'DELETE_STEP':
      return state.filter(step => step.stepId !== action.stepId);
    case 'DELETE_TASK':
      return state.filter(step => step.taskId !== action.taskId);
    default:
      return state;
  }
}
