import { connect } from 'react-redux';
import { setIconForTodo } from '../../../store/actions';
import IconsMenu from './IconsMenu';
import './style.css';

const mapDispatchToProps = dispatch => ({
  handleSetIcon(categoryId, icon) {
    dispatch(setIconForTodo(categoryId, icon));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { activeTodoId, activateIconsMenu, activateRename } = ownProps;
  const { handleSetIcon } = dispatchProps;
  const setIcon = (src = '') => {
    activateIconsMenu(false);
    activateRename(false);
    handleSetIcon(activeTodoId, ( src ? src : "fa-list" ));
  };

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    setIcon
  }
};

export default connect(null, mapDispatchToProps, mergeProps)(IconsMenu);
