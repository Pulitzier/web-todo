import { connect } from 'react-redux';
import { setIconForTodo } from '../../../store/actions';
import IconsMenu from './IconsMenuWrapper';

const mapDispatchToProps = dispatch => ({
  handleSetIcon(categoryId, icon) {
    dispatch(setIconForTodo(categoryId, icon));
  },
});

export default connect(null, mapDispatchToProps)(IconsMenu);
