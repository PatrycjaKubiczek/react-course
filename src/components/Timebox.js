import React from "react";
import { Button, TextField } from "@material-ui/core";

class Timebox extends React.Component {
  state = {
    updatedTitle: this.props.title,
    updatedTotalTimeInMinutes: this.props.totalTimeInMinutes,
  };
  constructor(props) {
    super(props);
  }
  handleTitleChange = (e) => {
    this.setState({ updatedTitle: e.target.value });
  };
  handleMinutesChange = (e) => {
    this.setState({ updatedTotalTimeInMinutes: e.target.value });
  };
  handleSubmit = (e) => {
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

        {!isEdited && (
          <Button onClick={onEdit} variant="outlined">
            edytuj
          </Button>
        )}
        {isEdited && (
          <Button onClick={this.handleSubmit} variant="outlined">
            zapisz
          </Button>
        )}
        <Button onClick={onDelete} variant="outlined">
          usuń
        </Button>
      </div>
    );
  }
}

export default Timebox;
