import connect from 'react-redux/es/connect/connect';
import { changeListTitle } from '../../../store/actions';
import RenameList from './RenameList';
import { getActiveTodoList } from '../../../helpers';

const mapStateToProps = ({ app: { categories } }) => ({
  activeTodoId: getActiveTodoList(categories).id,
  title: getActiveTodoList(categories).title,
  iconSource: getActiveTodoList(categories).iconSource,
});

const mapDispatchToProps = dispatch => ({
  handleChangeTitle(todoId, title) {
    dispatch(changeListTitle(todoId, title));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { activeTodoId } = stateProps;
  const { handleChangeTitle } = dispatchProps;
  const handleChangeListTitle = (str) => {
    handleChangeTitle(activeTodoId, str);
  };

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    handleChangeListTitle
  }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RenameList);
