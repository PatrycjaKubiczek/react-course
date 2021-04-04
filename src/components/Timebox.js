import React from "react";
import { Grid, Button } from "@material-ui/core";

class Timebox extends React.Component {
  state = {
    updatedTitle: this.props.title,
    updatedTotalTimeInMinutes: this.props.totalTimeInMinutes,
  };
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
      isEdited
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
        <Grid container display="flex" justify="flex-end">
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
        </Grid>
      </div>
    );
  }
}

export default Timebox;
