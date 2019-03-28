import { connect } from 'react-redux';
import { changeListTitle, shouldShowGreetings } from '../../store/actions';
import Banner from './Banner';
import './style.css';
import { getActiveTodoList } from '../../helpers';
import { BANNER_COLOR_SCHEME } from '../../store/constants';

const mapStateToProps = state => {
  const { title, id, bgImage, bgColor, sortOrder, iconSource } = getActiveTodoList(state.app.categories);
  return {
    activeTodoId: id,
    activeTodoTitle: title,
    bgImage,
    bgColor,
    sortOrder,
    iconSource,
    taskSettings: state.taskSettings
  }
};

const mapDispatchToProps = dispatch => ({
  handleShowGreeting(bool) {
    dispatch(shouldShowGreetings(bool));
  },
  handleChangeTitle(todoId, title) {
    dispatch(changeListTitle(todoId, title));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { handleShowGreeting } = dispatchProps;
  const { bgColor } = stateProps;
  const bgColorForBanner = `linear-gradient(rgba(${BANNER_COLOR_SCHEME[bgColor]},0.65), rgba(${BANNER_COLOR_SCHEME[bgColor]}, 0.35))`;
  const bgColorForSort = `rgba(${BANNER_COLOR_SCHEME[bgColor]},0.45)`;
  const deactivateGreetingPopup = () => handleShowGreeting(false);
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    bgColorForSort,
    bgColorForBanner,
    deactivateGreetingPopup
  }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Banner);
