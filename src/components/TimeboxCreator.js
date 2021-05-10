import React, { useRef } from "react";
import { Button, TextField, Paper } from "@material-ui/core";

function TimeboxCreator({ onCreate }) {
  const titleInput = useRef();
  const totalTimeInMinutesInput = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onCreate({
      title: titleInput.current.value,
      totalTimeInMinutes: totalTimeInMinutesInput.current.value,
      isEdited: false,
    });
    titleInput.current.value = "";
    totalTimeInMinutesInput.current.value = "";
  }
  return (
    <>
      <h2>Dodaj nowe zadanie</h2>
      <form className="CurrentTimebox">
        <TextField
          inputRef={titleInput}
          label="Co robisz?"
          variant="outlined"
        />
        <TextField
          inputRef={totalTimeInMinutesInput}
          label="Ile minut?"
          type="number"
          variant="outlined"
        />
        <Button variant="outlined" onClick={handleSubmit}>
          dodaj timebox
        </Button>
      </form>
    </>
  );
}

export default TimeboxCreator;
