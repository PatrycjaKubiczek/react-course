import React from "react";
class Timebox extends React.Component {
  state = {
    updatedTitle: this.props.title,
    updatedTotalTimeInMinutes: this.props.totalTimeInMinutes,
  };
  constructor(props) {
    super(props);
  }
  handleTitleChange = (e) => {
    this.setState({ updateTitle: e.target.value });
  };
  handleMinutesChange = (e) => {
    this.setState({ updatedTotalTimeInMinutes: e.target.value });
  };
  handleSubmit = (e) => {
    console.log(this.props.timebox);
    this.props.onSave(this.props.index, {
      ...this.props.timebox,
      title: this.state.updatedTitle,
      totalTimeInMinutes: this.state.updatedTotalTimeInMinutes,
      isEdited: false,
    });
  };

  render() {
    const {
      title,
      totalTimeInMinutes,
      onDelete,
      onEdit,
      onSave,
      isEdited,
      index,
      id,
    } = this.props;
    return (
      <div className="Timebox">
        {!isEdited && (
          <h3>
            {title} - {totalTimeInMinutes}{" "}
          </h3>
        )}
        {isEdited && (
          <form>
            <input
              className="updateInput"
              type="text"
              value={this.state.updatedTitle}
              onChange={this.handleTitleChange}
            />
            <input
              className="updateInput"
              type="number"
              value={this.state.updatedTotalTimeInMinutes}
              onChange={this.handleMinutesChange}
            />
          </form>
        )}

        {!isEdited && <button onClick={onEdit}>edytuj</button>}
        {isEdited && <button onClick={this.handleSubmit}>zapisz</button>}
        <button onClick={onDelete}>usuń</button>
      </div>
    );
  }
}

export default Timebox;
