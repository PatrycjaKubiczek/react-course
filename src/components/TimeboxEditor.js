import { Button, TextField } from "@material-ui/core";

function TimeboxEditor(props) {
  const {
    title,
    totalTimeInMinutes,
    isEditable,
    onTitleChange,
    onTotalTimeInInputOnChange,
    onConfirm,
    errorTitle,
    errorMinutes
  } = props;
  return (
    <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
      <TextField
        fullWidth
        label="Co robisz?"
        disabled={!isEditable}
        value={title}
        onChange={onTitleChange}
        required
        error={errorTitle}
      />
      <br />
      <TextField
        fullWidth
        disabled={!isEditable}
        value={totalTimeInMinutes}
        onChange={onTotalTimeInInputOnChange}
        label="Ile minut?"
        type="number"
        required
        error={errorMinutes}
        helperText={errorMinutes ? "obowiązkowe pole" : ""}
      />
      <br />
      <Button disabled={!isEditable} onClick={onConfirm} variant="outlined">
        zatwierdź zmiany
      </Button>
    </div>
  );
}

export default TimeboxEditor;
