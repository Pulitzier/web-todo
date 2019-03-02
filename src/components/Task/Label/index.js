import { connect } from 'react-redux';
import MainLabel from './MainLabel';
import './style.css';

const mapStateToProps = ({ app }) => ({
  categories: app.categories,
  steps: app.steps,
});

export default connect(mapStateToProps, null)(MainLabel);
