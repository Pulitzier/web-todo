import { connect } from 'react-redux';
import LabelWrapper from './LabelWrapper';
import './style.css';

const mapStateToProps = ({ app }) => ({
  categories: app.categories,
  steps: app.steps,
});

export default connect(mapStateToProps, null)(LabelWrapper);
