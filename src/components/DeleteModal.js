import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

export default class DeleteModal extends Component {
  constructor(props) {
    super(props);
  };

  static propTypes = {
    nameOfItem: PropTypes.string.isRequired,
    messageOfItem: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  render() {
    const props = this.props;
    return (
      <div
        className="confirmDeleteModal"
      >
        <div className="confirmDeleteModal-child">
          <h3>Delete {props.nameOfItem}?</h3>
          <p>"{props.messageOfItem}" will be deleted forever.</p>
          <div className="button-group">
            <button className="btn btn-danger" onClick={() => props.onDelete()}>Delete</button>
            <button className="btn btn-default" onClick={() => props.onCancel()}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
};