import { connect } from 'react-redux';
import { changeListTitle, shouldShowGreetings } from '../../store/actions';
import Banner from './Banner';
import './style.css';

const mapStateToProps = state => ({
  app: state.app,
  taskSettings: state.taskSettings,
});

const mapDispatchToProps = dispatch => ({
  handleShowGreeting(bool) {
    dispatch(shouldShowGreetings(bool));
  },
  handleChangeTitle(todoId, title) {
    dispatch(changeListTitle(todoId, title));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
