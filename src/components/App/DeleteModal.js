import React from 'react';

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
        <button className="btn btn-danger delete-button" onClick={() => onDelete()}>Delete</button>
        <button className="btn btn-default cancel-button" onClick={() => onCancel()}>Cancel</button>
      </div>
    </div>
  </div>
);

export default DeleteModal;
