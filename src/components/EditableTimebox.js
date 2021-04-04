import React from "react";
import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";
import { Paper } from "@material-ui/core";
class EditableTimebox extends React.Component {
  state = {
    title: "Uczę się kontrolowanych komponentów",
    totalTimeInMinutes: 15,
    isEditable: true,
    errorTitle: false,
    errorMinutes: false
  };
  componentWillUnmount() {
    this.stopTimer();
  }
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleTotalTimeInMinutesChange = (event) => {
    this.setState({ totalTimeInMinutes: event.target.value });
  };
  handleConfirm = () => {
    if(!this.state.title || !this.state.totalTimeInMinutes){
      return;
    }
    this.setState({ isEditable: false });
    
  };
  handleEdit = () => {
    this.setState({ isEditable: true });
  };
  render() {
    const { title, totalTimeInMinutes, isEditable, errorTitle, errorMinutes } = this.state;
    return (
      <>
        <h2>Obecne zadanie:</h2>

        {isEditable ? (
          <Paper>
            <TimeboxEditor
              title={title}
              totalTimeInMinutes={totalTimeInMinutes}
              isEditable={isEditable}
              onTitleChange={this.handleTitleChange}
              onTotalTimeInInputOnChange={this.handleTotalTimeInMinutesChange}
              onConfirm={this.handleConfirm}
              errorTitle={errorTitle}
              errorMinutes={errorMinutes}
            />
          </Paper>
        ) : (
          <Paper style={{padding: 20}}>
            <CurrentTimebox
              title={title}
              totalTimeInMinutes={totalTimeInMinutes}
              isEditable={isEditable}
              onEdit={this.handleEdit}
            />
          </Paper>
        )}
      </>
    );
  }
}

export default EditableTimebox;
