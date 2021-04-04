import React from "react";
import uuid from "uuid";
import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";
import ErrorBoundary from "./ErrorBoundary";
import { Paper } from "@material-ui/core";

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
    // console.log(indexToRemove);
    // console.log(this.state);
    this.setState((prevState) => {
      const timeboxes = prevState.timeboxes.filter(
        (timebox, index) => index !== indexToRemove
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
        <h2>Obecna lista zadań:</h2>
        <ErrorBoundary message="Błąd">
          {this.state.timeboxes.map((timebox, index) => (
            <Paper key={timebox.id}>
              <Timebox
                index={index}
                id={timebox.id}
                title={timebox.title}
                totalTimeInMinutes={timebox.totalTimeInMinutes}
                onDelete={() => this.removeTimebox(index)}
                onEdit={() => this.handleEdit(index)}
                onSave={this.handleSave}
                isEdited={timebox.isEdited}
              />
            </Paper>
          ))}
        </ErrorBoundary>
      </>
    );
  }
}

export default TimeboxList;
