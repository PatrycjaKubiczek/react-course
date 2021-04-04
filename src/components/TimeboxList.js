import React from "react";
import uuid from "uuid";
import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";

class TimeboxList extends React.Component {
  state = {
    timeboxes: [
      {
        id: uuid.v4(),
        title: "uczę się list",
        totalTimeInMinutes: 25,
        isEdited: false,
      },
      {
        id: uuid.v4(),
        title: "uczę się formularzy",
        totalTimeInMinutes: 15,
        isEdited: false,
      },
      {
        id: uuid.v4(),
        title: "uczę się komponentów",
        totalTimeInMinutes: 5,
        isEdited: false,
      },
    ],
  };
  addTimebox = (timebox) => {
    this.setState((prevState) => {
      const timeboxes = [timebox, ...prevState.timeboxes];
      return { timeboxes };
    });
  };
  removeTimebox = (indexToRemove) => {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.filter(
        (timebox, index) => !index == indexToRemove
      );
      return { timeboxes };
    });
  };
  updateTimebox = (indexToUpdate, updatedTimebox) => {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.map((timebox, index) =>
        index === indexToUpdate ? updatedTimebox : timebox
      );
      return { timeboxes };
    });
  };
  handleCreate = (createdTimebox) => {
    this.addTimebox(createdTimebox);
  };
  handleSave = (indexToUpdate, updatedTimebox) => {
    console.log(updatedTimebox);
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.map((timebox, index) =>
        index === indexToUpdate ? updatedTimebox : timebox
      );
      return { timeboxes };
    });
  };
  handleEdit = (indexToUpdate) => {
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.map((timebox, index) =>
        index === indexToUpdate ? { ...timebox, isEdited: true } : timebox
      );
      return { timeboxes };
    });
  };
  render() {
    return (
      <>
        <TimeboxCreator onCreate={this.handleCreate} />
        {this.state.timeboxes.map((timebox, index) => (
          <Timebox
            key={timebox.id}
            index={index}
            id={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
            onDelete={() => this.removeTimebox(index)}
            onEdit={() => this.handleEdit(index)}
            onSave={this.handleSave}
            isEdited={timebox.isEdited}
          />
        ))}
      </>
    );
  }
}

export default TimeboxList;