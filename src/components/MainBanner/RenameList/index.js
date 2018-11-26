import connect from 'react-redux/es/connect/connect';
import { changeListTitle } from '../../../store/actions';
import RenameListWrapper from './RenameListWrapper';

const mapStateToProps = ({ app: { categories } }) => ({
  categories,
});

const mapDispatchToProps = dispatch => ({
  handleChangeTitle(todoId, title) {
    dispatch(changeListTitle(todoId, title));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RenameListWrapper);
