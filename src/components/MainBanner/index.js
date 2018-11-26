import { connect } from 'react-redux';
import { shouldShowGreetings } from '../../store/actions';
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
