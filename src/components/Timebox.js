import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

class Timebox extends React.Component {
  state = {
    updatedTitle: this.props.title,
    updatedTotalTimeInMinutes: this.props.totalTimeInMinutes,
    id: this.props.id,
  };
  handleTitleChange = (e) => {
    this.setState({ updatedTitle: e.target.value });
  };
  handleMinutesChange = (e) => {
    this.setState({ updatedTotalTimeInMinutes: e.target.value });
  };
  handleSubmit = () => {
    console.log('yy')
     console.log(this.props);
    this.props.onSave(this.props.id, {
      title: this.state.updatedTitle,
      totalTimeInMinutes: this.state.updatedTotalTimeInMinutes,
      isEdited: false,
      id: this.state.id, // TODO PK
    });

   
  };

  render() {
    const { title, totalTimeInMinutes, onDelete, onEdit, isEdited } =
      this.props;
    return (
      <div className="Timebox">
        {!isEdited && (
          <h3>
            {title} - {totalTimeInMinutes}{" "}
          </h3>
        )}
        {isEdited && (
          <form>

            <TextField
              className="updateInput"
              type="text"
              value={this.state.updatedTitle}
              onChange={this.handleTitleChange}
            />
            <TextField
              className="updateInput"
              type="number"
              value={this.state.updatedTotalTimeInMinutes}
              onChange={this.handleMinutesChange}
            />
          </form>
        )}
        <Grid container display="flex" justify="flex-end">
          {!isEdited && (
            <>
              <Button onClick={onEdit} variant="outlined">
                edytuj
              </Button>
              <Button
                onClick={onDelete}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                usuń
              </Button>
            </>
          )}
          {isEdited && (
            <>
              <Button onClick={this.handleSubmit} variant="outlined">
                zapisz
              </Button>
              <Button onClick={this.handleCancel} variant="outlined">
                anuluj
              </Button>
            </>
          )}
        </Grid>
      </div>
    );
  }
}

export default Timebox;
