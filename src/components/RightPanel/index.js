import { connect } from 'react-redux';
import RightPanel from './RightPanel';
import './style.css';

const mapStateToProps = ({ app, search }) => ({
  categories: app.categories,
  tasks: app.tasks,
  activateSearchFlag: search.activateSearch,
});

export default connect(mapStateToProps, null)(RightPanel);
