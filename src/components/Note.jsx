import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <div className="note-footer">
      <small>
         {moment(props.timestamp).format("DD-MM-YYYY HH:mm:ss")}
      </small>
      <button onClick={handleClick}>
          <DeleteIcon />
      </button>
      </div>
    </div>
  );
}

export default Note;
