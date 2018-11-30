import React from 'react';
import PropTypes from 'react-proptypes';

const DeleteModal = ({
  nameOfItem, messageOfItem, onCancel, onDelete,
}) => (
  <div className="confirmDeleteModal">
    <div className="confirmDeleteModal-child">
      <h3>
Delete
        {nameOfItem}
?
      </h3>
      <p>
"
        {messageOfItem}
" will be deleted forever.
      </p>
      <div className="button-group">
        <button
          className="btn btn-danger delete-button"
          type="button"
          onClick={() => onDelete()}
        >
          Delete
        </button>
        <button
          className="btn btn-default cancel-button"
          type="button"
          onClick={() => onCancel()}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

DeleteModal.propTypes = {
  nameOfItem: PropTypes.string,
  messageOfItem: PropTypes.string,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
};

DeleteModal.defaultProps = {
  nameOfItem: '',
  messageOfItem: '',
  onCancel: () => {},
  onDelete: () => {},
};

export default DeleteModal;
