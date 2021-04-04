function TimeboxEditor(props) {
  const {
    title,
    totalTimeInMinutes,
    isEditable,
    onTitleChange,
    onTotalTimeInInputOnChange,
    onConfirm,
  } = props;
  return (
    <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
      <label>
        Co robisz?
        <input
          disabled={!isEditable}
          value={title}
          onChange={onTitleChange}
          type="text"
        />
      </label>
      <br />
      <label>
        Ile minut?
        <input
          disabled={!isEditable}
          value={totalTimeInMinutes}
          onChange={onTotalTimeInInputOnChange}
          type="number"
        />
      </label>
      <br />
      <button disabled={!isEditable} onClick={onConfirm}>
        zatwierdź zmiany
      </button>
    </div>
  );
}

export default TimeboxEditor;