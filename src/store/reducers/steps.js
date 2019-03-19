import { getLatestId } from '../../helpers';

export default function stepsReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_STEP_TO_TASK':
      return [
        ...state,
        {
          id: (getLatestId(state)+1),
          taskId: action.taskId,
          done: false,
          stepText: action.stepText,
        },
      ];
    case 'TOGGLE_STEP':
      return state.map((step) => {
        if (step.id === action.stepId) {
          return {
            ...step,
            done: !step.done,
          };
        }
        return step;
      });
    case 'DELETE_STEP':
      return state.filter(step => step.id !== action.stepId);
    case 'DELETE_TASK':
      return state.filter(step => step.taskId !== action.taskId);
    default:
      return state;
  }
}
