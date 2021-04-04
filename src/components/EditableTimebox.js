import React from "react";
import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";
class EditableTimebox extends React.Component {
  state = {
    title: "Uczę się kontrolowanych komponentów",
    totalTimeInMinutes: 15,
    isEditable: true,
  };
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleTotalTimeInMinutesChange = (event) => {
    this.setState({ totalTimeInMinutes: event.target.value });
  };
  handleConfirm = () => {
    this.setState({ isEditable: false });
  };
  handleEdit = () => {
    this.setState({ isEditable: true });
  };
  render() {
    const { title, totalTimeInMinutes, isEditable } = this.state;
    return (
      <>
      <hr />
        <h2>Obecne zadanie:</h2>
        <TimeboxEditor
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable={isEditable}
          onTitleChange={this.handleTitleChange}
          onTotalTimeInInputOnChange={this.handleTotalTimeInMinutesChange}
          onConfirm={this.handleConfirm}
        />
        <CurrentTimebox
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable={isEditable}
          onEdit={this.handleEdit}
        />
      </>
    );
  }
}

export default EditableTimebox;
