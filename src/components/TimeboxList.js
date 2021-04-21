import React from "react";
import { Paper } from "@material-ui/core";

import Timebox from "./Timebox";
import TimeboxCreator from "./TimeboxCreator";
import ErrorBoundary from "./ErrorBoundary";
import TimeboxesAPI from "../api/AxiosTimeboxesAPI";

class TimeboxList extends React.Component {
  state = {
    timeboxes: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    TimeboxesAPI.getAllTimeboxes()
      .then((timeboxes) => this.setState({ timeboxes }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  addTimebox = (timebox) => {
    TimeboxesAPI.addTimebox(timebox).then((addedTimebox) =>
      this.setState((prevState) => {
        const timeboxes = [...prevState.timeboxes, addedTimebox];
        return { timeboxes };
      })
    );
  };
  removeTimebox = (indexToRemove) => {
    TimeboxesAPI.removeTimebox(this.state.timeboxes[indexToRemove]).then(() => {
      this.setState((prevState) => {
        const timeboxes = prevState.timeboxes.filter(
          (timebox, index) => index !== indexToRemove
        );
        return { timeboxes };
      });
    });
  };
  updateTimebox = (indexToUpdate, updatedTimebox) => {
    console.log(updatedTimebox);
    TimeboxesAPI.replaceTimebox(updatedTimebox).then((updatedTimebox) => {
      this.setState((prevState) => {
        const timeboxes = prevState.timeboxes.map((timebox, index) =>
          index === indexToUpdate ? updatedTimebox : timebox
        );
        return { timeboxes };
      });
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
        <TimeboxCreator onCreate={this.addTimebox} />
        {this.state.loading && <p>timeboxy się ładują</p>}

        <h2>Obecna lista zadań:</h2>
        {this.state.error ? this.state.error : null}
        <ErrorBoundary message={"Błąd"}>
          {this.state.timeboxes.map((timebox, index) => (
            <Timebox
              key={timebox.id}
              index={index}
              id={timebox.id}
              title={timebox.title}
              totalTimeInMinutes={timebox.totalTimeInMinutes}
              onDelete={() => this.removeTimebox(index)}
              onEdit={() => this.handleEdit(index)}
              onSave={this.updateTimebox}
              isEdited={timebox.isEdited}
            />
          ))}
        </ErrorBoundary>
      </>
    );
  }
}

export default TimeboxList;
